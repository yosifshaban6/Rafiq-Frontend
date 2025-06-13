import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const pages = (isAuthenticated) => [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Projects", path: "/allproject" },
  ...(isAuthenticated ? [{ name: "Create New Project", path: "/create" }] : []),
  { name: "Contact Us", path: "/contact" },
];

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/logout" },
];

const searchStyles = {
  position: "relative",
  borderRadius: 4,
  backgroundColor: "rgba(255,255,255,0.15)",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  marginLeft: 2,
  width: "100%",
  maxWidth: 200,
  display: { xs: "none", sm: "flex" },
};

const iconWrapper = {
  padding: "0 8px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const inputStyle = {
  color: "inherit",
  paddingLeft: "32px",
  width: "100%",
  fontSize: "0.9rem",
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavClick = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleSettingClick = (path) => {
    if (path === "/logout") {
      handleLogout();
    } else {
      navigate(path);
    }
    handleCloseUserMenu();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        p: 2,
        bgcolor: "none",
      }}
    >
      <AppBar
        position="static"
        sx={{
          bgcolor: "#a084e8",
          height: 48,
          borderRadius: 8,
          maxWidth: "lg",
          width: "100%",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              height: "100%",
              minHeight: "48px !important",
            }}
          >
            {/* Mobile Menu */}
            <Box
              sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
            >
              <IconButton
                size="medium"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ p: 1 }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Logo */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                flexShrink: 0,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <VolunteerActivismIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => navigate("/")}
                sx={{
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                }}
              >
                Rafiq
              </Typography>
            </Box>

            {/* Desktop Logo */}
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <VolunteerActivismIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => navigate("/")}
                sx={{
                  mr: 2,
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                }}
              >
                Rafiq
              </Typography>
            </Box>

            {/* Menu + Search */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                ml: 2,
              }}
            >
              {pages(isAuthenticated).map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleNavClick(page.path)}
                  sx={{
                    color: "white",
                    display: "block",
                    mx: 1,
                    borderRadius: 2,
                    py: 0.5,
                    fontSize: "0.9rem",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {page.name}
                </Button>
              ))}
              <Box sx={searchStyles}>
                <Box sx={iconWrapper}>
                  <SearchIcon sx={{ fontSize: 18 }} />
                </Box>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  sx={inputStyle}
                />
              </Box>
            </Box>

            {/* Right Side: User Avatar or Auth Buttons */}
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {isAuthenticated ? (
                <>
                  <Tooltip title="User Menu">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0.5,
                        "&:hover": {
                          transform: "scale(1.1)",
                          transition: "transform 0.2s ease",
                        },
                      }}
                    >
                      <Avatar
                        alt="User"
                        src="/8.jpg"
                        sx={{
                          width: 32,
                          height: 32,
                          border: "2px solid rgba(255, 255, 255, 0.8)",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    sx={{ mt: "35px" }}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        onClick={() => handleSettingClick(setting.path)}
                        sx={{
                          borderRadius: 1,
                          py: 0.75,
                          "&:hover": {
                            bgcolor: "rgba(74, 47, 143, 0.1)",
                          },
                        }}
                      >
                        <Typography textAlign="center" fontSize="0.9rem">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate("/signup")}
                    sx={{
                      color: "#fff",
                      borderColor: "#fff",
                      fontSize: "0.8rem",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate("/signin")}
                    sx={{
                      fontSize: "0.8rem",
                      bgcolor: "#fff",
                      color: "#a084e8",
                      "&:hover": {
                        bgcolor: "#f0f0f0",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
