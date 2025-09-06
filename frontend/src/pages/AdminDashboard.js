import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Alert, CircularProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getDashboardStats } from "../services/api";

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDashboardStats();
        setData(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch admin stats. Is backend running?");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CircularProgress size={20} /> <span>Loading stats…</span>
        </div>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Verification Stats
          </Typography>
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#a6ff00ff" />
          </BarChart>
        </Paper>
      )}
    </Container>
  );
}

export default AdminDashboard;
