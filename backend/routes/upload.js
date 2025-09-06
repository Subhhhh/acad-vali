// routes/upload.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const { uploadCertificate } = require('../controllers/uploadController');
const { upload } = require('../middleware/upload');
const { requireAuth } = require('../middleware/auth');

router.post('/', requireAuth(), upload.single('file'), asyncHandler(uploadCertificate));

module.exports = router;
