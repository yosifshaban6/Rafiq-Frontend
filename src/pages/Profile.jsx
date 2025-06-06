import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProfileCard from "../components/ProfileCard";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";

function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    address: "New York, USA",
    joined: "January 2023",
    phone: "01072384294",
    birth_date: "2001-09-15",
    profile_picture: "/2.jpg",
    bio: "I'm a passionate developer with experience in full-stack web development, particularly using React, Node.js, and MongoDB. I enjoy building user-friendly applications and constantly learning new technologies. I also love contributing to open-source projects and collaborating with diverse teams.",
  });

  // useEffect(() => {
  // }, []);

  function onUpdateUser(updatedUser) {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  }

  const raisedAmount = 1200;
  const goalAmount = 5000;
  const progress = (raisedAmount / goalAmount) * 100;

  const projectImage = "/3.jpg";

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={3}
          alignItems="flex-start"
        >
          {/* Profile Section */}
          <Box sx={{ width: { xs: "100%", md: "25%" }, flexShrink: 0 }}>
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
