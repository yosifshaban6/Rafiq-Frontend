import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ProjectGrid from "../components/ProjectGrid";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

// Number of posts to show per page
const POSTS_PER_PAGE = 8;

function ProjectsList() {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${VITE_SERVER_URL}/funding/posts/`)
      .then((response) => {
        setAllPosts(response.data.results);
        // Initially show first page of posts
        setDisplayedPosts(response.data.slice(0, POSTS_PER_PAGE));
      })
      .catch((error) => console.error("Failed to fetch posts:", error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (allPosts.length > 0) {
      const endIndex = page * POSTS_PER_PAGE;
      setDisplayedPosts(allPosts.slice(0, endIndex));
    }
  }, [page, allPosts]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Calculate if there are more posts to load
  const hasMorePosts = displayedPosts.length < allPosts.length;

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, sm: 4 },
        borderRadius: 4,
        mb: 6,
        minHeight: "70vh",
      }}
    >
      <Container maxWidth="xl">
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
          All Projects
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress size={60} sx={{ color: "#7c3aed" }} />
          </Box>
        ) : (
          <>
            <ProjectGrid posts={displayedPosts} />

            {hasMorePosts && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleLoadMore}
                  sx={{
                    bgcolor: "#fff",
                    color: "#7c3aed",
                    px: 5,
                    py: 1,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: 16,
                    transition: "background-color 0.5s, color 0.5s",
                    "&:hover": {
                      bgcolor: "#6d28d9",
                      color: "#fff",
                    },
                  }}
                >
                  Load More
                </Button>
              </Box>
            )}

            {!hasMorePosts && allPosts.length > 0 && (
              <Typography
                variant="body1"
                textAlign="center"
                mt={4}
                color="#7c3aed"
              >
                You've reached the end of the projects list
              </Typography>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default ProjectsList;
