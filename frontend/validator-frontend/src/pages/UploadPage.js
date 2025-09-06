import React, { useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { uploadFile } from "../services/api";

function UploadPage() {
  const [file, setFile] = useState(null);
  const role = localStorage.getItem("role");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");
    try {
      await uploadFile(file);
      alert("File uploaded successfully!");
    } catch (err) {
      alert("Upload failed!");
    }
  };

  return (
    <>
      <Navbar role={role} />
      <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
        <Typography variant="h5">Upload Certificate</Typography>
        <input type="file" onChange={e => setFile(e.target.files[0])} style={{ marginTop: "20px" }} />
        <Button variant="contained" color="primary" onClick={handleUpload} style={{ marginTop: "20px" }}>
          Upload
        </Button>
      </Container>
    </>
  );
}

export default UploadPage;
