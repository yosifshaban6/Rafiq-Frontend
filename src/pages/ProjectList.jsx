import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  LinearProgress,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Eco-Friendly Water Bottles",
    description: "Help us reduce plastic waste with reusable water bottles.",
    image: "/6.jpg",
    raised: 9500,
    goal: 10000,
    date: "May 26, 2025",
  },
  {
    id: 2,
    title: "Smart Garden System",
    description:
      "Automate your garden with our smart sensors and watering system.",
    image: "/2.jpg",
    raised: 5000,
    goal: 10000,
    date: "May 20, 2025",
  },
  {
    id: 3,
    title: "Vertical Farm Project",
    description: "Grow food efficiently in small urban spaces.",
    image: "/3.jpg",
    raised: 3200,
    goal: 7000,
    date: "May 22, 2025",
  },
];

export default function Project_list() {
  return (
    <Box textAlign="center" mb={3} p={3}>
      <Typography variant="h4" gutterBottom align="center">
        All Projects
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="flex-start"
        textAlign="center"
      >
        {projects.map((project) => {
          const progress = Math.floor((project.raised / project.goal) * 100);
          return (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card
                sx={{
                  height: "100%",
                  width: "410px",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 5,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {project.date}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {project.description}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2">
                      Raised: ${project.raised} / ${project.goal}
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
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
                  </Box>
                </CardContent>
                <Box textAlign="center" pb={2}>
                  <Button
                    component={Link}
                    to={`/projectdetails`}
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "uppercase",
                      px: 3,
                      color: "#8668e1",
                      borderRadius: 2,
                      boxShadow: 3,
                      backgroundColor: "#fff",
                      border: "1px solid #8668e1",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#8668e1",
                        color: "#fff",
                      },
                    }}
                  >
                    Read More
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
