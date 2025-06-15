import { Box, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";

function ProjectGrid({ posts }) {
  return (
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
        <ProjectCard post={post} key={post.id} />
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
  );
}

export default ProjectGrid;
