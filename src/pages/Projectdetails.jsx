import React from "react";
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
  Rating,
  TextField,
  Divider,
} from "@mui/material";

const project = {
  title: "Eco-Friendly Water Bottles",
  image: "/2.jpg",
  description:
    "Join us in making the world greener by supporting our reusable bottle initiative. Every dollar helps reduce plastic waste and promote sustainability.Join us in making the world greener by supporting our reusable bottle initiative. Every dollar helps reduce plastic waste and promote sustainability.",
  raised: 7500,
  goal: 10000,
  tags: ["Eco", "Sustainability", "Reusable"],
  rating: 4.5,
};

export default function Projectdetails() {
  const progress = Math.floor((project.raised / project.goal) * 100);
  return (
    <Box p={3}>
      <Box
        mt={5}
        mb={5}
        display="flex"
        justifyContent="center"
        sx={{ width: "100%", overflowX: "auto", px: 2 }}
      >
        <Box
          display="flex"
          gap={4}
          sx={{
            width: "1200px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* الكارد الكبير على الشمال */}
          <Box flex={2}>
            <Card>
              <Typography variant="h4" gutterBottom>
                {project.title}
              </Typography>
              <CardMedia
                component="img"
                height="350"
                image={project.image}
                alt={project.title}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Description :
                </Typography>
                <Typography variant="body1" paragraph>
                  {project.description}
                </Typography>
                <Box mb={2}>
                  {project.tags.map((tag, i) => (
                    <Chip key={i} label={tag} sx={{ mr: 1 }} />
                  ))}
                </Box>
                <Typography variant="subtitle1" gutterBottom>
                  Rating:
                </Typography>
                <Rating value={project.rating} precision={0.5} readOnly />
              </CardContent>
            </Card>
            <Box mt={5} p={3}>
              <Typography textAlign="center" variant="h6" gutterBottom>
                Recommended Projects
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {[1, 2, 3, 4].map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Card>
                      <CardMedia component="img" height="140" image="/3.jpg" />
                      <CardContent>
                        <Typography variant="subtitle1">
                          Sample Project {i + 1}
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: 2,
                            backgroundImage: 'linear-gradient(135deg, #a084e8,rgb(202, 70, 174))',
                            boxShadow: 'none',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': {
                              backgroundImage: 'linear-gradient(135deg, #8668e1, #6b5fc7)',
                            },
                          }}
                        >
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>

          {/* الكروتين فوق بعض على اليمين */}
          <Box flex={1} display="flex" flexDirection="column" gap={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Funding Details</Typography>
                <Typography variant="body2">
                  Raised: ${project.raised} / ${project.goal}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundImage: 'linear-gradient(135deg, #8668e1,rgb(228, 48, 138))',
                      borderRadius: 5,
                    },
                  }}
                />

                <Box
                  textAlign="center"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" gutterBottom>
                    4.5
                  </Typography>
                  <Rating value={project.rating} precision={0.5} readOnly />
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundImage: 'linear-gradient(135deg, #a084e8,rgb(202, 70, 174))',
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundImage: 'linear-gradient(135deg, #8668e1, #6b5fc7)',
                    },
                  }}
                >
                  Fund this Project
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Leave a Comment
                </Typography>
                <TextField
                  label="Your comment"
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundImage: 'linear-gradient(135deg, #a084e8,rgb(202, 70, 174))',
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundImage: 'linear-gradient(135deg, #8668e1, #6b5fc7)',
                    },
                  }}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>


    </Box>
  );
}
