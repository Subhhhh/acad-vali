// routes/auth.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const { signup, login } = require('../controllers/authController');

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));

module.exports = router;
