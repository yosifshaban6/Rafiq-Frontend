import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  LinearProgress,
  Chip,
  TextField,
  Divider,
  Avatar,
  CircularProgress,
  Alert,
  IconButton,
  Container,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import RecommendedProjects from "../components/RecommendedProjects";
import { jwtDecode } from "jwt-decode";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

const token = localStorage.getItem("token");

export default function ProjectDetails() {
  const user = token ? jwtDecode(token) : null;
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [donationAmount, setDonationAmount] = useState("");
  const [fundingError, setFundingError] = useState(null);
  const [fundingSuccess, setFundingSuccess] = useState(false);
  const [fundingLoading, setFundingLoading] = useState(false);
  const [donationMessage, setDonationMessage] = useState("");

  useEffect(() => {
    const fetchProjectAndComments = async () => {
      try {
        setLoading(true);
        const projectResponse = await axios.get(
          `${VITE_SERVER_URL}/funding/posts/${id}/`
        );
        setProject(projectResponse.data);
        console.log("Response comments", projectResponse.data);

        // Format comments to ensure consistent structure
        const formattedComments =
          projectResponse.data.comments?.map((comment) => ({
            ...comment,
            user: {
              ...comment.user,
              first_name: comment.user.first_name || "",
              last_name: comment.user.last_name || "",
              username: comment.user.username || "",
              profile_picture: comment.user.profile_picture || "",
            },
          })) || [];
        console.log(formattedComments);
        setComments(formattedComments);
      } catch (err) {
        console.error("Failed to fetch project or comments:", err);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndComments();
  }, [id]);

  const progress = project
    ? Math.floor((project.current_amount / project.target_amount) * 100)
    : 0;

  const handleFundingButton = async () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      setFundingError("Please enter a valid donation amount (minimum $1)");
      return;
    }

    if (!user) {
      setFundingError("You need to be logged in to fund a project");
      return;
    }

    try {
      setFundingLoading(true);
      setFundingError(null);
      setFundingSuccess(false);

      await axios.post(
        `${VITE_SERVER_URL}/funding/donations/`,
        {
          post: parseInt(id),
          amount: parseFloat(donationAmount),
          message: donationMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedProjectResponse = await axios.get(
        `${VITE_SERVER_URL}/funding/posts/${id}/`
      );
      setProject(updatedProjectResponse.data);

      setFundingSuccess(true);
      setDonationAmount("");
      setDonationMessage("");

      setTimeout(() => setFundingSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to post donation:", err);
      setFundingError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to process donation. Please try again."
      );
    } finally {
      setFundingLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      setCommentError("Comment cannot be empty");
      return;
    }

    if (!user) {
      setCommentError("You need to be logged in to comment");
      return;
    }

    try {
      setCommentLoading(true);
      setCommentError(null);

      const response = await axios.post(
        `${VITE_SERVER_URL}/funding/comments/`,
        {
          post: id,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Create new comment with user data
      const newCommentWithUser = {
        ...response.data,
        user: {
          first_name: user.first_name || user.username,
          last_name: user.last_name || "",
          username: user.username,
          profile_picture: user.profile_picture || "",
        },
      };

      setComments([newCommentWithUser, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      setCommentError("Failed to post comment. Please try again.");
    } finally {
      setCommentLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.image_urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.image_urls.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} sx={{ color: "#7c3aed" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!project) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <Alert severity="warning" sx={{ width: "100%", maxWidth: 600 }}>
          Project not found
        </Alert>
      </Box>
    );
  }

  const isProjectAuthor = user && project.author === user.username;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={4}>
        {/* Project Details Column - now 8 columns in md */}
        <Grid item size={8}>
          <Card>
            <Typography variant="h4" gutterBottom sx={{ p: 3 }}>
              {project.title}
            </Typography>

            <Box sx={{ position: "relative", height: 450 }}>
              <CardMedia
                component="img"
                height="450"
                image={project.image_urls[currentImageIndex].image}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                sx={{ objectFit: "cover", width: "100%" }}
              />

              <IconButton
                onClick={prevImage}
                sx={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.7)",
                  },
                }}
              >
                <ArrowBack />
              </IconButton>

              <IconButton
                onClick={nextImage}
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.7)",
                  },
                }}
              >
                <ArrowForward />
              </IconButton>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                }}
              >
                {project.image_urls.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor:
                        index === currentImageIndex ? "#7c3aed" : "white",
                      opacity: index === currentImageIndex ? 1 : 0.5,
                      cursor: "pointer",
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </Box>
            </Box>

            <CardContent>
              <Typography variant="h5" gutterBottom>
                Description:
              </Typography>
              <Typography variant="body1" paragraph>
                {project.content}
              </Typography>
              <Box mb={2}>
                {project.tags.map((tag, i) => (
                  <Chip key={i} label={tag.name} sx={{ mr: 1 }} />
                ))}
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle1" mr={1}>
                  Created by:
                </Typography>
                <Typography variant="body1">{project.author}</Typography>
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                Created on: {new Date(project.created_at).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side Column (Funding and Comments) - now 4 columns in md */}
        <Grid item size={4}>
          {/* Funding Card - Only show if user is not the project author */}
          {!isProjectAuthor && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">Funding Details</Typography>
                <Typography variant="body2">
                  Raised: ${project.current_amount.toLocaleString()} / $
                  {project.target_amount.toLocaleString()}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    my: 2,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": {
                      backgroundImage:
                        "linear-gradient(135deg, #8668e1,rgb(228, 48, 138))",
                      borderRadius: 5,
                    },
                  }}
                />

                {fundingSuccess && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Thank you for your donation!
                  </Alert>
                )}

                {fundingError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {fundingError}
                  </Alert>
                )}

                <TextField
                  label="Amount to Fund ($)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    inputProps: {
                      min: 1,
                      step: "0.01",
                    },
                  }}
                />

                <TextField
                  label="Optional Message"
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleFundingButton}
                  disabled={fundingLoading}
                  sx={{
                    mt: 2,
                    backgroundImage:
                      "linear-gradient(135deg, #a084e8,rgb(202, 70, 174))",
                    boxShadow: "none",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(135deg, #8668e1, #6b5fc7)",
                    },
                  }}
                >
                  {fundingLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Fund this Project"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leave a Comment
              </Typography>

              {commentError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {commentError}
                </Alert>
              )}

              <TextField
                label="Your Comment"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={!user}
                placeholder={!user ? "Please login to comment" : ""}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleCommentSubmit}
                disabled={commentLoading || !user}
                sx={{
                  mt: 2,
                  backgroundImage:
                    "linear-gradient(135deg, #a084e8,rgb(202, 70, 174))",
                  boxShadow: "none",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(135deg, #8668e1, #6b5fc7)",
                  },
                }}
              >
                {commentLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </CardContent>
          </Card>

          {comments.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Comments ({comments.length})
                </Typography>
                {comments.map((comment) => (
                  <Box key={comment.id} sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Avatar
                        src={`${VITE_SERVER_URL}${comment.user.profile_picture}`}
                        sx={{
                          bgcolor: "#4b2997",
                          width: 32,
                          height: 32,
                          mr: 1.5,
                          fontSize: "0.875rem",
                        }}
                      >
                        {comment.user.first_name?.charAt(0)?.toUpperCase() ||
                          comment.user.username?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                          {comment.user.first_name} {comment.user.last_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(comment.created_at).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ pl: 4.5 }}>
                      {comment.content}
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {project && (
        <Box mt={6}>
          <RecommendedProjects project={project} />
        </Box>
      )}
    </Container>
  );
}
