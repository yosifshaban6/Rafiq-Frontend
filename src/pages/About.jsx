// AboutPage.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

function About() {
  return (
    <Box sx={{ py: 8, bgcolor: "#f9f9fb", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ color: "#4a2f8f" }}
        >
          About Rafiq
        </Typography>

        {/* Introduction */}
        <Typography variant="body1" sx={{ mb: 4, maxWidth: "700px" }}>
          Rafiq is a platform built to connect people with meaningful
          volunteering and charitable projects. Whether you want to launch your
          own cause or support others, Rafiq makes it easier to make a
          difference.
        </Typography>

        {/* Mission & Difference */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, bgcolor: "white", borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "#5c4db1" }}
              >
                Our Mission
              </Typography>
              <Typography variant="body2" mt={1}>
                To empower individuals and organizations by providing a simple,
                impactful way to start and manage projects that contribute
                positively to their communities.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, bgcolor: "white", borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "#5c4db1" }}
              >
                What Makes Us Different?
              </Typography>
              <Typography variant="body2" mt={1}>
                We focus on ease of use, transparency, and community building.
                Our platform brings together changemakers in a modern and
                accessible way.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Video Section */}
        <Box mt={8} mb={6}>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 2, color: "#4a2f8f" }}
          >
            Watch Our Intro Video
          </Typography>
          <Box
            sx={{
              position: "relative",
              paddingTop: "56.25%", // 16:9 ratio
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/gBkLoLfrEIM?si=rfunb8pvpVsWtyxd"
              title="Intro Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Box>

        {/* Timeline */}
        <Box mt={6}>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 3, color: "#4a2f8f" }}
          >
            Project Lifecycle
          </Typography>

          <Timeline position="alternate">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  Step 1: Idea Submission
                </Typography>
                <Typography variant="body2">
                  Users submit their project ideas to get started.
                </Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  Step 2: Review & Approval
                </Typography>
                <Typography variant="body2">
                  Our team evaluates and approves qualified projects.
                </Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  Step 3: Launch & Promote
                </Typography>
                <Typography variant="body2">
                  Projects go live and are promoted on the platform.
                </Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="warning" />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  Step 4: Support & Track Progress
                </Typography>
                <Typography variant="body2">
                  Supporters can donate and track project updates.
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>

        <Divider sx={{ my: 5 }} />
      </Container>
    </Box>
  );
}

export default About;
