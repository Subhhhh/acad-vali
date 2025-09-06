import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import VerificationResults from "./pages/VerificationResults";
import AdminDashboard from "./pages/AdminDashboard";

const PrivateRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");
  if (!userRole) return <Navigate to="/" />;
  if (role && role !== userRole) return <Navigate to="/" />;
  return children;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/upload" element={<PrivateRoute role="user"><UploadPage /></PrivateRoute>} />
        <Route path="/results" element={<PrivateRoute role="user"><VerificationResults /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
