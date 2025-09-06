// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./db/db');

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const verifyRoutes = require('./routes/verify');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check + stub endpoints (optional)
app.get('/', (req, res) => res.send('Backend is up'));
app.get('/api/admin/stats', (req, res) => {
  const data = [
    { name: 'Verified', count: 120 },
    { name: 'Fake', count: 15 },
    { name: 'Pending', count: 30 }
  ];
  res.json(data);
});
app.get('/api/results', (req, res) => {
  res.json([
    { name: 'Alice', degree: 'B.Tech CSE', status: 'Verified' },
    { name: 'Bob', degree: 'MBA', status: 'Fake' },
    { name: 'Cara', degree: 'B.Sc', status: 'Pending' }
  ]);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/admin', adminRoutes);

// Global error handler (keeps responses consistent)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
  });
});