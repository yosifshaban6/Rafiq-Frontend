import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import axios from "axios";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

export default function EmailVerificationSuccess() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { token } = useParams();
  const [countdown, setCountdown] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verify email with backend
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.post(`${VITE_SERVER_URL}/account/activate/${token}/`);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Email verification failed");
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setError("Invalid verification link");
      setLoading(false);
    }
  }, [token]);

  // Countdown and redirect
  useEffect(() => {
    if (!loading && !error) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/signin");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, error, navigate]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            py: 4,
          }}
        >
          <CircularProgress size={60} sx={{ color: "#4A2F8F", mb: 3 }} />
          <Typography variant="h6">Verifying your email...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100vh",
            py: 4,
          }}
        >
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button
            variant="contained"
            onClick={() => navigate("/signin")}
            sx={{
              backgroundColor: "#4A2F8F",
              "&:hover": { backgroundColor: "#3A1F7F" },
            }}
          >
            Return to Sign In
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          py: 4,
        }}
      >
        {/* Brand Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 700,
              color: "#4A2F8F",
              letterSpacing: 1,
            }}
          >
            <VolunteerActivismIcon
              sx={{
                fontSize: 48,
                color: "#4A2F8F",
                mb: 1,
              }}
            />
            Rafiq
          </Typography>
        </Box>

        {/* Success Visual */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 40,
              color: theme.palette.success.main,
            }}
          />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
            Email Verified Successfully!
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2, fontSize: "1.1rem" }}>
          Welcome to the Rafiq family!{" "}
          <span role="img" aria-label="celebrate">
            🎉
          </span>
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Thank you for verifying your email address. Your account is now fully
          activated and ready to use.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/signin")}
            sx={{
              backgroundColor: "#4A2F8F",
              "&:hover": { backgroundColor: "#3A1F7F" },
            }}
          >
            Sign In Now
          </Button>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            (Auto-redirect in {countdown} second{countdown !== 1 ? "s" : ""})
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
