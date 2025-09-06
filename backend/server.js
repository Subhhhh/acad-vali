require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const uploadRoutes = require('./routes/upload');
const verifyRoutes = require('./routes/verify');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors()); // tighten in production
app.use(express.json());
app.use(morgan("dev"));

// ===== Health Check =====
app.get("/", (req, res) => res.send("Backend is up"));

// ===== Extra Stub Routes =====
app.get("/api/admin/stats", (req, res) => {
  const data = [
    { name: "Verified", count: 120 },
    { name: "Fake", count: 15 },
    { name: "Pending", count: 30 },
  ];
  res.json(data);
});

app.get("/api/results", (req, res) => {
  res.json([
    { name: "Alice", degree: "B.Tech CSE", status: "Verified" },
    { name: "Bob", degree: "MBA", status: "Fake" },
    { name: "Cara", degree: "B.Sc", status: "Pending" },
  ]);
});

// ===== Modular Routes =====
app.use('/api/upload', uploadRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/admin', adminRoutes);

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
