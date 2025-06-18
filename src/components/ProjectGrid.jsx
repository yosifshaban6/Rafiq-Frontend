import { useState } from "react";
import { Box, Snackbar, Typography, Alert } from "@mui/material";
import ProjectCard from "./ProjectCard";

function ProjectGrid({ posts, setPosts }) {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const handleDeleteProject = (deletedProjectId) => {
    console.log(deletedProjectId);
    setPosts(posts.filter((project) => project.id !== deletedProjectId));
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 2,
        }}
      >
        {posts.map((post) => (
          <ProjectCard
            key={post.id}
            post={post}
            onDelete={handleDeleteProject}
            onShowNotification={showNotification}
          />
        ))}
        {posts.length === 0 && (
          <Box
            sx={{
              mt: 8,
              textAlign: "center",
              color: "#a084e8",
              opacity: 0.7,
              gridColumn: "1 / -1",
            }}
          >
            <Typography variant="h6">
              No projects found. Check back soon!
            </Typography>
          </Box>
        )}
      </Box>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </>
  );
}

export default ProjectGrid;
