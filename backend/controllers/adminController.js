// controllers/adminController.js
const Certificate = require('../models/certificate');
const OcrResult = require('../models/ocr-results');
const Blacklist = require('../models/blacklist');

exports.getReports = async (req, res) => {
  try {
    const [certCount, ocrCompleted, blackCount] = await Promise.all([
      Certificate.countDocuments(),
      OcrResult.countDocuments({ status: 'completed' }),
      Blacklist.countDocuments()
    ]);

    return res.json({
      certificates: certCount,
      ocrCompleted,
      blacklisted: blackCount
    });
  } catch (err) {
    console.error('Reports error:', err);
    return res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

exports.addToBlacklist = async (req, res) => {
  try {
    const { cert_id, reason } = req.body;

    if (!cert_id) return res.status(400).json({ error: 'cert_id is required' });

    const doc = await Blacklist.findOneAndUpdate(
      { cert_id },
      { $set: { reason, added_by: req.user.sub } },
      { upsert: true, new: true }
    );

    return res.status(201).json(doc);
  } catch (err) {
    console.error('Blacklist add error:', err);
    return res.status(500).json({ error: 'Failed to add to blacklist' });
  }
};

exports.removeFromBlacklist = async (req, res) => {
  try {
    const { cert_id } = req.params;
    if (!cert_id) return res.status(400).json({ error: 'cert_id is required' });

    await Blacklist.deleteOne({ cert_id });
    return res.json({ removed: true });
  } catch (err) {
    console.error('Blacklist remove error:', err);
    return res.status(500).json({ error: 'Failed to remove from blacklist' });
  }
};

exports.listBlacklist = async (req, res) => {
  try {
    const list = await Blacklist.find().sort({ createdAt: -1 });
    return res.json(list);
  } catch (err) {
    console.error('Blacklist list error:', err);
    return res.status(500).json({ error: 'Failed to fetch blacklist' });
  }
};
