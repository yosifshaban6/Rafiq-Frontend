import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CardHeader,
  Avatar,
  LinearProgress,
} from "@mui/material";

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

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, sm: 4 },
        borderRadius: 4,
        mb: 6,
      }}
    >
      <Container maxWidth="lg">
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
        <Box
          component="div"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 2,
          }}
        >
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                cursor: "pointer",
                transition: "all 0.5s ease-in-out",
                "&:hover": {
                  boxShadow: 5,
                  borderColor: "#a084e8",
                },
                border: "1.5px solid #ede9fe",
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onClick={() => {
                const isAuthenticated = localStorage.getItem("token");
                if (!isAuthenticated) {
                  alert("Please log in to view project details.");
                  return;
                }
                navigate(`/posts/${post.id}`);
              }}
              elevation={0}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: "#4b2997",
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {post.author[0].toUpperCase()}
                  </Avatar>
                }
                title={
                  <Typography fontWeight={600} color="#4b2997">
                    {post.author}
                  </Typography>
                }
                subheader={
                  <Typography variant="caption" color="text.secondary">
                    {new Date(post.created_at).toLocaleDateString()}
                  </Typography>
                }
                sx={{ pb: 0 }}
              />
              <CardContent sx={{ py: 0 }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    mb: 1,
                    color: "#7c3aed",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  sx={{
                    mb: 2,
                    minHeight: 48,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.content.length < 100
                    ? post.content
                    : post.content.slice(0, 100) + "..."}
                </Typography>
                <Box my={1}>
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.name}
                      size="small"
                      sx={{
                        mr: 0.7,
                        mb: 0.7,
                        bgcolor: "#ede9fe",
                        color: "#7c3aed",
                        fontWeight: 500,
                        fontSize: 13,
                      }}
                    />
                  ))}
                </Box>
                <Box>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography
                      variant="body2"
                      color="#4b2997"
                      fontWeight={600}
                    >
                      ${post.current_amount.toLocaleString()}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={post.funding_percentage}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#ede9fe",
                      "& .MuiLinearProgress-bar": {
                        background:
                          "linear-gradient(90deg, #a084e8 0%, #ca46ae 100%)",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block", textAlign: "right" }}
                  >
                    {post.funding_percentage.toFixed()} %
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        {posts.length === 0 && (
          <Box
            sx={{
              mt: 8,
              textAlign: "center",
              color: "#a084e8",
              opacity: 0.7,
            }}
          >
            <Typography variant="h6">
              No projects found. Check back soon!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Home;
