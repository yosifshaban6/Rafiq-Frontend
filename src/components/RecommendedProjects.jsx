import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ProjectCard from "./ProjectCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

export default function RecommendedProjects({ project }) {
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderRef, setSliderRef] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getSlidesToShow = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  useEffect(() => {
    const fetchRecommendedProjects = async () => {
      if (!project || !project.tags || project.tags.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const params = new URLSearchParams();
        project.tags.forEach((tag) => {
          params.append("tags", tag.id);
        });

        const response = await axios.get(`${VITE_SERVER_URL}/funding/posts/`, {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredPosts = response.data
          .filter((post) => post.id !== project.id)
          .slice(0, 6);

        setRecommendedPosts(filteredPosts);
      } catch (err) {
        console.error("Failed to fetch recommended projects:", err);
        setError(
          err.response?.data?.message || "Failed to load recommended projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProjects();
  }, [project]);

  const sliderSettings = {
    dots: true,
    infinite: recommendedPosts.length > getSlidesToShow(),
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress size={30} sx={{ color: "#7c3aed" }} />
      </Box>
    );
  }

  if (recommendedPosts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography textAlign="center" variant="h6" gutterBottom>
        Recommended Projects
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {recommendedPosts.length > getSlidesToShow() && (
        <>
          <IconButton
            onClick={() => sliderRef?.slickPrev()}
            sx={{
              position: "absolute",
              left: { xs: -20, sm: -30 },
              top: "50%",
              zIndex: 2,
              color: "#fff",
              backgroundColor: "#9f7aea",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#7c3aed",
              },
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            onClick={() => sliderRef?.slickNext()}
            sx={{
              position: "absolute",
              right: { xs: -20, sm: -30 },
              top: "50%",
              zIndex: 2,
              backgroundColor: "#9f7aea",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#7c3aed",
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </>
      )}

      <Slider ref={setSliderRef} {...sliderSettings}>
        {recommendedPosts.map((post) => (
          <Box key={post.id} sx={{ px: 1 }}>
            <ProjectCard post={post} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
