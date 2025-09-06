// routes/verify.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const { verifyCertificate } = require('../controllers/verifyController');

router.get('/:cert_id', asyncHandler(verifyCertificate));

// Optional: base route for info/health
router.get('/', (req, res) => res.json({ message: 'Use /:cert_id to verify' }));

module.exports = router;
