import React from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// Custom Arrow Components
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        ...style,
        display: "block",
        color: "white",
        right: 15,
        zIndex: 10,
        "&:before": {
          fontSize: "30px",
          color: "white",
        },
      }}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        ...style,
        display: "block",
        color: "white",
        left: 15,
        zIndex: 10,
        "&:before": {
          fontSize: "30px",
          color: "white",
        },
      }}
    />
  );
}

export default function Home() {
  const stats = [
    {
      number: "34000+",
      label: "Donors",
      desc: "People of different ages are welcome to donate",
    },
    {
      number: "6240+",
      label: "Projects",
      desc: "Various Projects that deserve to be donated",
    },
    {
      number: "21500+",
      label: "Reviews",
      desc: "Feel free to rate projects and give us a feedback",
    },
  ];

  const latestProjects = ["Test", "Sixth", "War", "Third", "Save Roxy"];
  const featuredProjects = ["First", "Save Roxy", "War", "Sixth", "Test"];

  const sliderImages = ["/6.jpg", "/2.jpg", "/3.jpg"];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const projects = [
    {
      width: 400,
      height: 400,
      title: "Latest Projects",
      items: latestProjects,
      bgImage: "/4.jpg",
    },
    {
      width: 400,
      height: 400,
      title: "Featured Projects",
      items: featuredProjects,
      bgImage: "/5.jpg",
    },
  ];

  return (
    <div className="App">
      {/* Slideshow with 3 images */}
      <Box sx={{ position: "relative", mb: 10 }}>
        <Slider {...sliderSettings}>
          {sliderImages.map((img, idx) => (
            <Box
              key={idx}
              sx={{
                height: "500px",
                position: "relative",
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                textAlign: "center",
                flexDirection: "column",
              }}
            >
              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0,0,0,0.5)",
                  zIndex: 1,
                }}
              />
              {/* Text content centered */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  px: 2,
                  top: "40%",
                  maxWidth: "80%",
                  mx: "auto",
                }}
              >
                <Typography variant="h3" fontWeight="bold">
                  Save Roxy
                </Typography>
                <Typography variant="subtitle1">
                  CLICK AND START DONATING NOW
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>

        {/* Statistics Section */}
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            bottom: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "20px",
            p: 4,
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#fff",
            width: { xs: "90%", md: "80%" },
            zIndex: 3,
            boxShadow: 3,
          }}
        >
          {stats.map((item, index) => (
            <Box textAlign="center" key={index}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="rgb(202, 70, 174)"
              >
                {item.number}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {item.label}
              </Typography>
              <Typography variant="body2">{item.desc}</Typography>
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Projects Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          <Grid container spacing={4} justifyContent="center">
            {projects.map((project, idx) => (
              <Grid item key={idx}>
                <Paper
                  sx={{
                    width: project.width,
                    height: project.height,
                    borderRadius: 4,
                    p: 4,
                    color: "#fff",
                    backgroundImage: `
                                            linear-gradient(135deg, rgba(195, 20, 50, 0.8), rgba(51, 19, 75, 0.8)),
                                            url(${project.bgImage})
                                        `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={2}
                    gap={1}
                  >
                    {project.title === "Latest Projects" && (
                      <CheckCircleIcon sx={{ color: "#fff" }} />
                    )}
                    {project.title === "Featured Projects" && (
                      <LightbulbIcon sx={{ color: "#fff" }} />
                    )}
                    <Typography variant="h6" sx={{ color: "#fff" }}>
                      {project.title}
                    </Typography>
                  </Box>
                  <List sx={{ flexGrow: 1 }}>
                    {project.items.map((item, i) => (
                      <ListItem
                        key={i}
                        sx={{
                          justifyContent: "center",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "#fff",
                          py: 0.5,
                        }}
                      >
                        <FiberManualRecordIcon
                          sx={{ fontSize: 10, color: "#fff" }}
                        />
                        <Typography variant="body1">{item}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="outlined"
                    sx={{ color: "#fff", borderColor: "#fff" }}
                    endIcon={<ArrowForwardIosIcon fontSize="small" />}
                  >
                    View All
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Create Project Button */}
      <Box sx={{ textAlign: "center", my: 6 }}>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              px: 4,
              py: 2,
              borderRadius: "50px",
              backgroundImage:
                "linear-gradient(135deg, #a084e8, rgb(202, 70, 174))",
              boxShadow: "none",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundImage: "linear-gradient(135deg, #8668e1, #6b5fc7)",
              },
            }}
          >
            CREATE YOUR OWN PROJECT
          </Button>
        </Link>
      </Box>
    </div>
  );
}
