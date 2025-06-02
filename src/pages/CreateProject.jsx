import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  Divider,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DescriptionIcon from "@mui/icons-material/Description";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FlagIcon from "@mui/icons-material/Flag";

export default function CreateProject() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    raised: 9500,
    goal: 10000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 5,
          mb: 5,
          p: 5,
          borderRadius: 4,
          boxShadow: 6,
          bgcolor: "#f9f9f9",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#5e35b1" }}
        >
          Launch a New Project
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Project Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Project Date"
                name="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Description"
                name="description"
                multiline
                rows={4}
                value={form.description}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Raised Amount"
                name="raised"
                type="number"
                value={form.raised}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TrendingUpIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Goal Amount"
                name="goal"
                type="number"
                value={form.goal}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlagIcon />
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
                size="large"
                sx={{
                  backgroundImage: "linear-gradient(135deg, #8e24aa, #3949ab)",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "bold",
                  py: 1.5,
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(135deg, #6a1b9a, #283593)",
                  },
                }}
              >
                Create Project
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
