import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Success() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 500,
          width: "100%",
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 80, color: "#4caf50", marginBottom: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Message Sent Successfully!
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={4}>
          Thank you for contacting us. We'll get back to you soon.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#a084e8",
            "&:hover": { backgroundColor: "#9370db" },
            borderRadius: "12px",
            paddingX: 4,
            paddingY: 1,
            fontWeight: "bold",
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
}
