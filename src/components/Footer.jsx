import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: { xs: 2, sm: 4 },
        mt: 6,
        background: "#4a2f8f",
        boxShadow: "0 8px 32px 0 rgba(160,132,232,0.15)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3, zIndex: 1 }}>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontWeight: 700,
            letterSpacing: 2,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <Link
            href="/"
            color="#fff"
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <VolunteerActivismIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
            Rafiq
          </Link>
        </Typography>
      </Box>
      <Grid container justifyContent="center" spacing={2} sx={{ zIndex: 1 }}>
        <Grid item>
          <Link
            href="/"
            underline="hover"
            color="#fff"
            sx={{ fontWeight: 600 }}
          >
            Home
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="#"
            underline="hover"
            color="#fff"
            sx={{ fontWeight: 600 }}
          >
            Features
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="#"
            underline="hover"
            color="#fff"
            sx={{ fontWeight: 600 }}
          >
            Enterprise
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="#"
            underline="hover"
            color="#fff"
            sx={{ fontWeight: 600 }}
          >
            Support
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="#"
            underline="hover"
            color="#fff"
            sx={{ fontWeight: 600 }}
          >
            ICO
          </Link>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: "20px", zIndex: 1 }}>
        <Link href="#" color="#fff" sx={{ margin: "0 10px" }}>
          <Twitter />
        </Link>
        <Link href="#" color="#fff" sx={{ margin: "0 10px" }}>
          <Facebook />
        </Link>
        <Link href="#" color="#fff" sx={{ margin: "0 10px" }}>
          <Instagram />
        </Link>
        <Link href="#" color="#fff" sx={{ margin: "0 10px" }}>
          <LinkedIn />
        </Link>
      </Box>

      <Typography
        variant="body2"
        sx={{
          marginTop: "20px",
          color: "#ede9fe",
          fontWeight: 500,
          zIndex: 1,
        }}
      >
        © 2020 Pied Piper. All rights reserved.
      </Typography>
    </Box>
  );
}
