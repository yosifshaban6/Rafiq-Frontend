import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#f8f8f8", py: 6 }}>
      <Container>
        <Grid container spacing={4} justifyContent="center" textAlign="center">
          <Grid item xs={12} md={2}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={1}
            >
              <VolunteerActivismIcon
                sx={{ mr: 1, fontSize: "1.5rem", color: "#a084e8" }}
              />
              <Typography variant="h6" fontWeight="bold" color="#a084e8">
                Rafiq
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography gutterBottom>About Us</Typography>
            <Typography gutterBottom>Freebies</Typography>
            <Typography gutterBottom>Blog</Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography gutterBottom>Illustrations</Typography>
            <Typography gutterBottom>Bills & Snippets</Typography>
            <Typography gutterBottom>Affiliate Program</Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography gutterBottom>Contact Us</Typography>
            <Typography gutterBottom>Knowledge Center</Typography>
            <Typography gutterBottom>Custom Development</Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography gutterBottom>Terms & Conditions</Typography>
            <Typography gutterBottom>Privacy Policy</Typography>
            <Typography gutterBottom>Licenses (EULA)</Typography>
          </Grid>
        </Grid>

        <Typography align="center" mt={6} color="textSecondary">
          © 2022 Rafiq. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
