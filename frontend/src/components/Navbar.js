import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Auth Validator
        </Typography>
        {role === "admin" && (
          <Button color="inherit" onClick={() => navigate("/admin")}>Dashboard</Button>
        )}
        {role === "user" && (
          <>
            <Button color="inherit" onClick={() => navigate("/upload")}>Upload</Button>
            <Button color="inherit" onClick={() => navigate("/results")}>Results</Button>
          </>
        )}
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
