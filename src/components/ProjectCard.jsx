import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CardHeader,
  Avatar,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "react-router";

function ProjectCard({ post }) {
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
      onClick={() => handleCardClick(post.id)}
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
            <Typography variant="body2" color="#4b2997" fontWeight={600}>
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
                background: "linear-gradient(90deg, #a084e8 0%, #ca46ae 100%)",
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
  );
}

export default ProjectCard;
