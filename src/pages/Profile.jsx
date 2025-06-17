import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProfileCard from "../components/ProfileCard";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { CircularProgress, LinearProgress } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ProjectCard from "../components/ProjectCard";
import Grid from "@mui/material/Grid";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

function Profile() {
  const [user, setUser] = useState(null);
  const [funds, setFunds] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // First get user profile to get the user ID
        const profileResponse = await axios.get(
          `${VITE_SERVER_URL}/account/profile/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(profileResponse.data);

        console.log(profileResponse.data.id);

        // Then fetch funds and projects in parallel
        const [fundsResponse, projectsResponse] = await Promise.all([
          axios.get(`${VITE_SERVER_URL}/funding/donations/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(
            `${VITE_SERVER_URL}/funding/posts/?author=${profileResponse.data.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        setFunds(fundsResponse.data.results);
        setUserProjects(projectsResponse.data.results || []);
        setDataLoaded(true);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  function onUpdateUser(updatedUser) {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  }

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box py={4} textAlign="center">
          <Typography variant="h6" mt={2}>
            Loading your profile...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#9f7aea" }} />
      </Container>
    );
  }

  if (!dataLoaded) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ height: "70vh" }}>
      <Box py={4}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={3}
          alignItems="flex-start"
        >
          {/* Profile Section */}
          <Box sx={{ width: { xs: "100%", md: "30%" }, flexShrink: 0 }}>
            <ProfileCard user={user} onUpdateUser={onUpdateUser} />

            {user?.bio && (
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mt: 3,
                  boxShadow: "0px 4px 12px #9f7aea63",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ color: "#4A2F8F" }}
                >
                  About Me
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {user.bio}
                </Typography>
              </Paper>
            )}
          </Box>

          {/* Main Content Section */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Donations Table */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: "5px",
                boxShadow: "0 0 0 2px #9f7aea63",
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                fontWeight="bold"
                color="#4A2F8F"
              >
                My Donations
              </Typography>

              {funds.length > 0 ? (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="donations table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Project</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Amount</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Date</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Message</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {funds.map((fund) => (
                        <TableRow
                          key={fund.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            {fund.post_title || `Project ${fund.post}`}
                          </TableCell>
                          <TableCell>${fund.amount}</TableCell>
                          <TableCell>
                            {new Date(fund.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{fund.message || "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  No donations found.
                </Typography>
              )}
            </Paper>

            {/* User Projects Section */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: "5px",
                boxShadow: "0 0 0 2px #9f7aea63",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h5" fontWeight="bold" color="#4A2F8F">
                  My Projects
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href="/project/create"
                  sx={{
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #a084e8, rgb(202, 70, 174))",
                    fontWeight: "bold",
                    px: 3,
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #8a6ee8, rgb(182, 50, 164))",
                    },
                  }}
                >
                  Create New Project
                </Button>
              </Box>

              {userProjects.length > 0 ? (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(400px, 1fr))",
                    gap: 3,
                    py: 2,
                  }}
                >
                  {userProjects.map((project) => (
                    <Box key={project.id}>
                      <ProjectCard post={project} />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  You haven't created any projects yet.
                </Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
