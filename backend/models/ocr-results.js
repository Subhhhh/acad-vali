// models/OcrResult.js
const mongoose = require('mongoose');

const ocrResultSchema = new mongoose.Schema(
  {
    cert_id: { type: String, required: true, index: true },
    raw_text: { type: String },
    fields: {
      holder_name: String,
      issued_by: String,
      issue_date: Date
    },
    confidence: Number,
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending', index: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('OcrResult', ocrResultSchema);
