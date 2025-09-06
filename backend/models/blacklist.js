// models/Blacklist.js
const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema(
  {
    cert_id: { type: String, required: true, unique: true, index: true },
    reason: { type: String },
    added_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blacklist', blacklistSchema);
