const express = require('express');
const pool = require('../../db/db'); 

const router = express.Router();

router.get('/:cert_id', async (req, res) => {
  const { cert_id } = req.params;
  try {
    const dbResult = await pool.query(
      'SELECT * FROM certificates WHERE cert_id = $1',
      [cert_id]
    );
    if (dbResult.rows.length === 0) {
      return res.status(404).json({ valid: false, message: 'Certificate not found' });
    }
    res.json({ valid: true, data: dbResult.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;
