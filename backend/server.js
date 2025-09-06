// server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // allow all origins for dev; tighten later if you want
app.use(express.json());
app.use(morgan("dev"));

// --- Routes ---
// Admin stats (for your Admin Dashboard charts)
app.get("/api/admin/stats", (req, res) => {
  // Return whatever shape your chart expects
  const data = [
    { name: "Verified", count: 120 },
    { name: "Fake", count: 15 },
    { name: "Pending", count: 30 },
  ];
  res.json(data);
});

// OPTIONAL: Stubs so other pages don’t break during development
app.get("/api/results", (req, res) => {
  res.json([
    { name: "Alice", degree: "B.Tech CSE", status: "Verified" },
    { name: "Bob", degree: "MBA", status: "Fake" },
    { name: "Cara", degree: "B.Sc", status: "Pending" },
  ]);
});

app.post("/api/upload", (req, res) => {
  // We’re not parsing files here yet; just return success for now.
  res.json({ ok: true, message: "Upload stubbed (backend not parsing file yet)." });
});

// Health check
app.get("/", (req, res) => res.send("Backend is up"));

// Start
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
