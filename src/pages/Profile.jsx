import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProfileCard from "../components/ProfileCard";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import axios from "axios"; // Import axios for API calls

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

function Profile() {
  const [user, setUser] = useState(null); // Initialize user as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${VITE_SERVER_URL}/account/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in Authorization header
            },
          }
        );

        console.log("User data fetched:", response.data);
        setUser(response.data); // Set user data from the response
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data. Please try again.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  function onUpdateUser(updatedUser) {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  }

  const raisedAmount = 1200;
  const goalAmount = 5000;
  const progress = (raisedAmount / goalAmount) * 100;

  const projectImage = "/3.jpg";

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box py={4} textAlign="center">
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box py={4} textAlign="center">
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={3}
          alignItems="flex-start"
        >
          {/* Profile Section */}
          <Box sx={{ width: { xs: "100%", md: "30%" }, flexShrink: 0 }}>
            <ProfileCard user={user} onUpdateUser={onUpdateUser} />
          </Box>

          {/* Bio and Project Section */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: "#f9f9f9",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight="bold">
                About Me
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.bio}
              </Typography>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: "#f9f9f9",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Current Project
              </Typography>

              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={3}
                mb={3}
              >
                {/* Project Image */}
                <Box
                  sx={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    width: { xs: "100%", md: "40%" },
                    height: "auto",
                    boxShadow: 2,
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={projectImage}
                    alt="Latest Project"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      minHeight: "200px",
                      maxHeight: "300px",
                    }}
                  />
                </Box>

                {/* Project Description */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" color="text.secondary" mb={2}>
                    I'm currently working on an innovative platform designed to
                    connect communities through collaborative tools and
                    real-time interactions. This project aims to enhance digital
                    communication and productivity, especially for remote teams
                    and educators.
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    To bring this project to life, I'm currently seeking funding
                    to support backend infrastructure, cloud services, and
                    design assets. Your support can help make this idea a
                    reality!
                  </Typography>

                  {/* Project Tags */}
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                  >
                    {["React", "Node.js", "MongoDB", "Community Platform"].map(
                      (tag) => (
                        <Paper
                          key={tag}
                          elevation={0}
                          sx={{
                            backgroundColor: "#e0e0e0",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 4,
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            {tag}
                          </Typography>
                        </Paper>
                      )
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Progress Bar */}
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    ${raisedAmount.toLocaleString()} raised
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Goal: ${goalAmount.toLocaleString()}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    mt: 1,
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": {
                      background:
                        "linear-gradient(135deg, #a084e8, rgb(202, 70, 174))",
                    },
                  }}
                />
              </Box>

              {/* Edit Project Button */}
              <Box textAlign="right">
                <Button
                  variant="contained"
                  color="primary"
                  href="/edit"
                  sx={{
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #a084e8, rgb(202, 70, 174))",
                    fontWeight: "bold",
                    mt: 2,
                    px: 3,
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #8a6ee8, rgb(182, 50, 164))",
                    },
                  }}
                >
                  Edit Project
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
