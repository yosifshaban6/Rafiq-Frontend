import React, { useState, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Card,
  Divider,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import SettingsDialog from "./SettingsDialog";
import axios from "axios";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

function ProfileCard({ user, onUpdateUser }) {
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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
    resetFormData();
  };

  const resetFormData = () => {
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

  const handleSaveSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      const dataToSend = { ...formData };

      // Don't send profile_picture if it hasn't changed
      if (dataToSend.profile_picture === user.profile_picture) {
        delete dataToSend.profile_picture;
      }

      const response = await axios.put(
        `${VITE_SERVER_URL}/account/update-profile/`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onUpdateUser(response.data);
      setOpenSettings(false);
      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      setError(error.response?.data?.detail || "Failed to update profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.match("image.*")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const uploadFormData = new FormData();
      uploadFormData.append("profile_picture", file);

      const response = await axios.patch(
        `${VITE_SERVER_URL}/account/profile/`,
        uploadFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        profile_picture: response.data.profile_picture,
      }));
      onUpdateUser(response.data);
      setSuccess("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px #9f7aea63",
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

        {/* Profile Picture */}
        <Box
          sx={{
            width: 100,
            height: 100,
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
            cursor: "pointer",
          }}
          onClick={() => fileInputRef.current.click()}
        >
          {formData.profile_picture ? (
            <CardMedia
              component="img"
              sx={{ height: "100%", width: "100%", objectFit: "cover" }}
              image={formData.profile_picture}
              alt={`${formData.first_name} ${formData.last_name}`}
            />
          ) : (
            <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: "none" }}
          />
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
              fontSize: "1.8rem",
              color: "#4A2F8F",
              fontWeight: 700,
              mt: 1,
              letterSpacing: "0.5px",
            }}
          >
            {`${formData.first_name} ${formData.last_name}`.trim() ||
              "No Name Provided"}
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
              { label: "Address", value: formData.address },
              { label: "Phone", value: formData.phone },
              { label: "Birth Date", value: formData.birth_date },
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

        <SettingsDialog
          open={openSettings}
          onClose={handleCloseSettings}
          onSave={handleSaveSettings}
          formData={formData}
          onInputChange={handleInputChange}
          onImageUpload={handleImageUpload}
          uploading={uploading}
          setFormData={setFormData}
          onUpdateUser={onUpdateUser}
        />
      </Card>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert severity="success" onClose={handleCloseAlert}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProfileCard;
