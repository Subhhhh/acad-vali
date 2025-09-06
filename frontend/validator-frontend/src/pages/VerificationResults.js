import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import Navbar from "../components/Navbar";
import { getResults } from "../services/api";

function VerificationResults() {
  const [results, setResults] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getResults();
        setResults(res.data);
      } catch (err) {
        alert("Failed to fetch results");
      }
    };
    fetchResults();
  }, []);

  return (
    <>
      <Navbar role={role} />
      <Container style={{ marginTop: "30px" }}>
        <Typography variant="h5" gutterBottom>Verification Results</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((r, idx) => (
              <TableRow key={idx}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.degree}</TableCell>
                <TableCell>{r.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
}

export default VerificationResults;
