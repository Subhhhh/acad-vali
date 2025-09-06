// models/Certificate.js
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    cert_id: { type: String, required: true, unique: true, index: true },
    holder_name: { type: String, required: true },
    issued_by: { type: String, required: true },
    issue_date: { type: Date, required: true },
    extra_fields: { type: mongoose.Schema.Types.Mixed },
    file_path: { type: String },
    file_id: { type: mongoose.Schema.Types.ObjectId }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certificate', certificateSchema);
