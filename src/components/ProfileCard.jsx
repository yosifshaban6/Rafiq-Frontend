import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Card, Divider, CardContent, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import SettingsDialog from "./SettingsDialog";

function ProfileCard(props) {
  const { user, onUpdateUser } = props;
  const [openSettings, setOpenSettings] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    profile_picture: user.profile_picture || "",
    bio: user.bio || "",
    address: user.address || "",
    birth_date: user.birth_date || "",
    phone: user.phone || "",
  });

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      profile_picture: user.profile_picture || "",
      bio: user.bio || "",
      address: user.address || "",
      birth_date: user.birth_date || "",
      phone: user.phone || "",
    });
  };

  const handleSaveSettings = () => {
    onUpdateUser(formData);
    setOpenSettings(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SettingsIcon
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          color: "#4A2F8F",
          cursor: "pointer",
          "&:hover": { color: "#3a226f" },
        }}
        onClick={handleOpenSettings}
      />
      <Box
        sx={{
          width: 80,
          height: 80,
          marginTop: 3,
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#4A2F8F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `3px solid #4A2F8F`,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {user.profile_picture ? (
          <CardMedia
            sx={{ height: 80, width: 80, objectFit: "cover" }}
            image={user.profile_picture}
            title={`${user.first_name} ${user.last_name}`}
          />
        ) : (
          <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
        )}
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          px: 2.5,
          py: 1.5,
          position: "relative",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            textAlign: "center",
            fontSize: "1.2rem",
            color: "#4A2F8F",
            fontWeight: 700,
            mt: 1,
            letterSpacing: "0.5px",
          }}
        >
          {`${user.first_name} ${user.last_name}`.trim()}
        </Typography>
        <Divider
          sx={{
            width: "85%",
            my: 1.5,
            borderColor: "#4a2f8f3b",
            borderWidth: 1,
          }}
        />
        <List sx={{ width: "100%", px: 1 }}>
          {[
            { label: "Email", value: user.email },
            { label: "Address", value: user.address },
            { label: "Phone", value: user.phone },
            { label: "Birth Date", value: user.birth_date },
          ].map((item, idx) => (
            <ListItem key={idx} disablePadding sx={{ py: 0.75 }}>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    minWidth: 90,
                    color: "#4A2F8F",
                    letterSpacing: "0.3px",
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    flex: 1,
                    textAlign: "left",
                    color: "text.secondary",
                  }}
                >
                  {item.value || "Not provided"}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>

      {/* Settings Dialog */}
      <SettingsDialog
        open={openSettings}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
        formData={formData}
        onInputChange={handleInputChange}
      />
    </Card>
  );
}

export default ProfileCard;
