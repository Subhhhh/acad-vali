// controllers/uploadController.js
const Certificate = require('../models/certificate');
const { processOcr } = require('../services/ocr-services.js');

exports.uploadCertificate = async (req, res) => {
  try {
    const { cert_id, holder_name, issued_by, issue_date, ...extra } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    if (!cert_id || !holder_name || !issued_by || !issue_date) {
      return res.status(400).json({ error: 'cert_id, holder_name, issued_by, issue_date are required' });
    }

    const existing = await Certificate.findOne({ cert_id });
    if (existing) {
      return res.status(409).json({ error: 'Certificate already exists' });
    }

    const cert = await Certificate.create({
      cert_id,
      holder_name,
      issued_by,
      issue_date: new Date(issue_date),
      extra_fields: extra,
      file_path: req.file.path
    });

    const ocrDoc = await processOcr(cert_id, req.file.path);

    return res.status(201).json({ certificate: cert, ocr: ocrDoc });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
};
