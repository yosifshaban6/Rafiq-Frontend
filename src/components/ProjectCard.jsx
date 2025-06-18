import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CardHeader,
  Avatar,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

function ProjectCard({ post, onDelete, onShowNotification }) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Define the color palette
  const primaryColor = "#4a2f8f";
  const primaryLight = "#7a5fbf";
  const primaryDark = "#1d0061";
  const secondaryColor = "#f8f4ff";

  const getCurrentUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.username || decoded.sub;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const isOwner = getCurrentUserId() === post.author;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      onShowNotification("Please log in to delete projects.", "warning");
      return;
    }
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/funding/posts/${post.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      onDelete(post.id);
      onShowNotification("Project deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting project:", error);
      onShowNotification(
        error.response?.data?.detail ||
          error.message ||
          "Failed to delete project.",
        "error"
      );
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleCardClick = () => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      onShowNotification("Please log in to view project details.", "warning");
      return;
    }
    navigate(`/posts/${post.id}`);
  };

  const fundingPercentage =
    post.target_amount > 0
      ? Math.min(100, (post.current_amount / post.target_amount) * 100)
      : 0;

  return (
    <>
      <Card
        sx={{
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: `0 0px 12px rgba(74, 47, 143, 0.3)`,
          },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          border: `2px solid ${secondaryColor}`,
        }}
        onClick={handleCardClick}
        elevation={0}
      >
        {isOwner && (
          <IconButton
            onClick={handleDeleteClick}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: primaryColor,
              "&:hover": {
                backgroundColor: "rgba(74, 47, 143, 0.1)",
              },
              zIndex: 1,
            }}
            aria-label="delete project"
          >
            <DeleteIcon />
          </IconButton>
        )}

        <CardHeader
          avatar={
            <Avatar
              src={post.user_image}
              alt={post.author}
              sx={{
                bgcolor: primaryColor,
                color: "#fff",
              }}
            >
              {post.author?.[0]?.toUpperCase() || "U"}
            </Avatar>
          }
          title={
            <Typography fontWeight={600} color={primaryDark}>
              {post.author || "Unknown"}
            </Typography>
          }
          subheader={
            <Typography variant="caption" color="text.secondary">
              {new Date(post.created_at).toLocaleDateString()}
            </Typography>
          }
          sx={{ pb: 0 }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              color: primaryDark,
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.5rem",
            }}
          >
            {post.content}
          </Typography>

          {post.tags?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  sx={{
                    mr: 1,
                    mb: 1,
                    backgroundColor: primaryLight,
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: primaryColor,
                    },
                  }}
                />
              ))}
            </Box>
          )}

          <Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" fontWeight={600} color={primaryDark}>
                ${post.current_amount?.toLocaleString() || "0"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                of ${post.target_amount?.toLocaleString() || "0"}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={fundingPercentage}
              sx={{
                height: 8,
                borderRadius: 4,
                mb: 0.5,
                backgroundColor: "rgba(74, 47, 143, 0.1)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: primaryColor,
                },
              }}
            />

            <Typography
              variant="caption"
              color={primaryDark}
              sx={{ display: "block", textAlign: "right" }}
            >
              {fundingPercentage.toFixed()}% funded
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: primaryColor }}>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{post.title}"? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              color: primaryColor,
              "&:hover": {
                backgroundColor: secondaryColor,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              backgroundColor: primaryColor,
              color: "#fff",
              "&:hover": {
                backgroundColor: primaryDark,
              },
            }}
            disabled={isDeleting}
            startIcon={
              isDeleting ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProjectCard;
