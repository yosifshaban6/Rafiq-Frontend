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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/allproject" },
  { name: "Create", path: "/create" },
];
const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/logout" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavClick = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleSettingClick = (path) => {
    navigate(path);
    handleCloseUserMenu();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        p: 2,
      }}
    >
      <AppBar
        position="static"
        sx={{
          bgcolor: "#4A2F8F",
          height: 48, // Reduced from 64 to make it thinner
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
              minHeight: "48px !important", // Override default min-height
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

            {/* Mobile Logo and Icon */}
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

            {/* Desktop Logo and Icon */}
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
                  fontSize: "1.1rem", // Smaller text
                }}
              >
                Rafiq
              </Typography>
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                ml: 4,
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleNavClick(page.path)}
                  sx={{
                    color: "white",
                    display: "block",
                    mx: 1,
                    borderRadius: 2,
                    py: 0.5, // Reduced vertical padding
                    fontSize: "0.9rem", // Smaller text
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Tooltip title="User Menu">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0.5, // Reduced padding
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.2s ease",
                    },
                  }}
                >
                  <Avatar
                    alt="User"
                    src="/1.jpg"
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
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
                      py: 0.75, // Reduced padding
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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
