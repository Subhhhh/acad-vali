const express = require('express');
const pool = require('../../db/db'); 

const router = express.Router();

router.get('/reports', async (req, res) => {
  try {
    const reports = await pool.query('SELECT * FROM certificates');
    res.json(reports.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

router.post('/blacklist', async (req, res) => {
  const { cert_id, reason } = req.body;
  try {
    await pool.query(
      'INSERT INTO blacklist (cert_id, reason) VALUES ($1, $2)',
      [cert_id, reason]
    );
    res.json({ message: 'Certificate blacklisted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to blacklist' });
  }
});

module.exports = router;
