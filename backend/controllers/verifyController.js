// controllers/verifyController.js
const Certificate = require('../models/certificate');
const OcrResult = require('../models/ocr-results');
const Blacklist = require('../models/blacklist');

function normalize(str) {
  return (str || '').toString().trim().toLowerCase();
}

exports.verifyCertificate = async (req, res) => {
  try {
    const { cert_id } = req.params;

    if (!cert_id) return res.status(400).json({ valid: false, reason: 'cert_id is required' });

    const [cert, ocr, black] = await Promise.all([
      Certificate.findOne({ cert_id }),
      OcrResult.findOne({ cert_id }).sort({ createdAt: -1 }),
      Blacklist.findOne({ cert_id })
    ]);

    if (!cert) {
      return res.status(404).json({ valid: false, reason: 'Certificate not found' });
    }

    if (black) {
      return res.json({ valid: false, reason: 'Blacklisted', blacklist: black });
    }

    if (!ocr) {
      return res.status(404).json({ valid: false, reason: 'No OCR result found' });
    }

    const matches = {
      holder_name: normalize(cert.holder_name) === normalize(ocr.fields?.holder_name),
      issued_by: normalize(cert.issued_by) === normalize(ocr.fields?.issued_by),
      issue_date:
        cert.issue_date?.toISOString().slice(0, 10) ===
        (ocr.fields?.issue_date ? new Date(ocr.fields.issue_date).toISOString().slice(0, 10) : null)
    };

    const valid = matches.holder_name && matches.issued_by && matches.issue_date;

    return res.json({ valid, matches, cert, ocr });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ error: 'Verification failed' });
  }
};
