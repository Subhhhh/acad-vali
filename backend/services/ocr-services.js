// services/ocrService.js
const OcrResult = require('../models/OcrResult');

// Placeholder OCR processing — replace with real OCR API integration
async function processOcr(cert_id, filePath) {
  // TODO: Call OCR, parse text → fields
  const raw_text = 'Sample OCR text';
  const fields = {
    holder_name: 'John Doe',
    issued_by: 'Org',
    issue_date: new Date()
  };
  const confidence = 0.93;
  const status = 'completed';

  const ocrDoc = await OcrResult.create({ cert_id, raw_text, fields, confidence, status });
  return ocrDoc;
}

module.exports = { processOcr };
