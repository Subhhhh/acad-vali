// routes/admin.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const { requireAuth } = require('../middleware/auth');
const {
  getReports,
  addToBlacklist,
  removeFromBlacklist,
  listBlacklist
} = require('../controllers/adminController');

router.get('/reports', requireAuth('admin'), asyncHandler(getReports));
router.post('/blacklist', requireAuth('admin'), asyncHandler(addToBlacklist));
router.delete('/blacklist/:cert_id', requireAuth('admin'), asyncHandler(removeFromBlacklist));
router.get('/blacklist', requireAuth('admin'), asyncHandler(listBlacklist));

module.exports = router;
