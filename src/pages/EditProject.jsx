import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Alert,
  Snackbar,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function EditProject() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    raised: 7500,
    goal: 10000,
  });
  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    const existingProject = {
      title: "Save Roxy",
      date: "2025-06-01",
      description: "A project to save animals and nature.",
      raised: 7500,
      goal: 10000,
    };
    setForm(existingProject);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      setAlert({
        open: true,
        severity: "error",
        message: "Please fill all required fields.",
      });
      return;
    }
    setAlert({
      open: true,
      severity: "success",
      message: "Project updated successfully!",
    });
  };

  const progressPercent = Math.min((form.raised / form.goal) * 100, 100);

  return (
    <Container maxWidth="sm" sx={{ mb: 6 }}>
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3, // أقل padding
          borderRadius: 2,
          backgroundColor: "rgba(203, 182, 252, 0.15)", // لون فاتح وشفاف
          backdropFilter: "blur(6px)", // تأثير طمس خفيف للخلفية
          boxShadow: "0 4px 12px rgba(101, 71, 202, 0.1)", // ظل أخف
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <EditIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Edit Project
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary" mb={0.7}>
            Funding Progress
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              mb: 0.5,
              "& .MuiLinearProgress-bar": {
                backgroundImage:
                  "linear-gradient(135deg, #a084e8, rgb(202, 70, 174))",
              },
              backgroundColor: "#e0e0e0", // لون خلفية الشريط الخفيف
            }}
          />

          <Typography variant="body2" color="textSecondary" align="right">
            Raised ${form.raised} of ${form.goal} ({Math.round(progressPercent)}
            %)
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {" "}
            {/* أقل تباعد */}
            <Grid item xs={12}>
              <TextField
                label="Project Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="small" // حجم أصغر
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EditIcon color="action" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon color="action" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project Description"
                name="description"
                multiline
                rows={3} // أقل ارتفاع
                value={form.description}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="action" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Raised Amount"
                name="raised"
                type="number"
                value={form.raised}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon color="action" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Goal Amount"
                name="goal"
                type="number"
                value={form.goal}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon color="action" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundImage:
                    "linear-gradient(135deg, #a084e8, rgb(202, 70, 174))",
                  boxShadow: "none",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  px: 4,
                  py: 1.8,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(135deg, #8668e1, #6b5fc7)",
                    boxShadow: "0 0 15px 2px rgba(134, 104, 225, 0.7)",
                  },
                }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
