import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(6),
}));

const ContactCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  height: "100%",
}));

function InfoItem({ icon: Icon, label, value }) {
  return (
    <Box display="flex" alignItems="center" gap={2} mt={2}>
      <Icon color="primary" />
      <Box>
        <Typography variant="body1" fontWeight="bold">
          {label}
        </Typography>
        <Typography variant="body2">{value}</Typography>
      </Box>
    </Box>
  );
}

export default function ContactPage() {
  return (
    <StyledContainer>
      <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Typography
          variant="h4"
          textAlign="center"
          color="#a084e8"
          mb={4}
          fontWeight="bold"
        >
          Contact Us
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {/* Left Side - Form (50%) */}
          <Box
            sx={{
              flex: { xs: "100%", md: "50%" },
              minWidth: 600,
            }}
          >
            <ContactCard sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Send us a message
                </Typography>
                <Box
                  component="form"
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <TextField label="Name" fullWidth />
                  <TextField label="Email" fullWidth />
                  <TextField label="Phone" fullWidth />
                  <TextField label="Address" fullWidth />
                  <TextField label="Message" multiline rows={6} fullWidth />
                  <Button
                    variant="contained"
                    component={Link}
                    to="/success"
                    sx={{
                      backgroundColor: "#a084e8",
                      "&:hover": { backgroundColor: "#9370db" },
                      borderRadius: "10px",
                      mt: 1,
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </CardContent>
            </ContactCard>
          </Box>

          {/* Right Side - Info + Map (25% each) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              flex: { xs: "100%", md: "25%" },
              minWidth: 280,
            }}
          >
            <ContactCard sx={{ height: "auto" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <InfoItem
                  icon={EmailIcon}
                  label="Email"
                  value="contact@rafiq.com"
                />
                <InfoItem
                  icon={PhoneIcon}
                  label="Phone"
                  value="+20 123 456 7890"
                />
                <InfoItem
                  icon={LocationOnIcon}
                  label="Address"
                  value="123 Rafiq St, Cairo, Egypt"
                />
              </CardContent>
            </ContactCard>

            <ContactCard sx={{ height: "auto", padding: 0 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Our Location
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    borderRadius: "15px",
                    overflow: "hidden",
                    height: 240,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.1260663000214!2d31.235711515429514!3d30.044419781876303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c45d83b3b1%3A0xf15dc5aaf6dbb1a3!2sDowntown%20Cairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1685639691066!5m2!1sen!2seg"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              </CardContent>
            </ContactCard>
          </Box>
        </Box>
      </Box>
    </StyledContainer>
  );
}
