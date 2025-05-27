import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    warning: {
      main: "#f57c00",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#2e7d32",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This resets browser default styles */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
