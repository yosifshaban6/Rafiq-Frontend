// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Container, Box, Typography } from "@mui/material";
import ProjectGrid from "../components/ProjectGrid";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${VITE_SERVER_URL}/funding/posts/`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error("Failed to fetch posts:", error));
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (postId) => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      alert("Please log in to view project details.");
      return;
    }
    navigate(`/posts/${postId}`);
  };

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, sm: 4 },
        borderRadius: 4,
        mb: 6,
      }}
    >
      <Container maxWidth="xl">
        {!isAuthenticated && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 4,
              gap: 4,
              justifyContent: "space-between",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              background: "linear-gradient(120deg, #9474e6 60%, #ede9fe 100%)",
              boxShadow: "0 8px 32px 0 rgba(160,132,232,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -30,
                left: -30,
                width: 100,
                height: 100,
                bgcolor: "#ede9fe",
                opacity: 0.25,
                borderRadius: "50%",
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -40,
                right: -40,
                width: 120,
                height: 120,
                bgcolor: "#ca46ae",
                opacity: 0.15,
                borderRadius: "50%",
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                zIndex: 1,
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    color: "#fff",
                    letterSpacing: 1,
                    mb: 0.5,
                  }}
                >
                  Welcome to Rafiq!
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#ede9fe"
                  maxWidth={{ sm: "80%" }}
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Discover and support amazing funding projects below, or bring
                  your ideas to life.
                </Typography>
              </Box>
            </Box>
            <Box
              component="button"
              sx={{
                bgcolor: "#fff",
                color: "#a084e8",
                px: 4,
                py: 1.5,
                border: "2px solid #fff",
                borderRadius: 3,
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer",
                boxShadow: 2,
                transition: "border 0.5s",
                "&:hover": {
                  border: "2px solid #a084e8",
                  bgcolor: "#fff",
                  color: "#a084e8",
                },
                mt: { xs: 3, sm: 0 },
                minWidth: 180,
                zIndex: 1,
              }}
              onClick={() => {
                alert("Please log in to create a project.");
              }}
            >
              Create Project
            </Box>
          </Box>
        )}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#4b2997",
            fontWeight: 600,
            letterSpacing: 1,
            mb: 3,
          }}
        >
          Featured Projects
        </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <ProjectGrid posts={posts} onCardClick={handleCardClick} />
      </Container>
    </Box>
  );
}

export default Home;
