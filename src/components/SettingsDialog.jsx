import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  Avatar,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";

function SettingsDialog({
  open,
  onClose,
  onSave,
  formData,
  onInputChange,
  onImageUpload,
  uploading,
}) {
  const fileInputRef = React.useRef(null);

  const triggerFileInput = () => fileInputRef.current.click();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Edit Profile
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 2 }}>
          {/* Profile Picture Upload */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                overflow: "hidden",
                bgcolor: "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px dashed",
                borderColor: "#4A2F8F",
                cursor: "pointer",
                mb: 1,
              }}
              onClick={triggerFileInput}
            >
              {formData.profile_picture ? (
                <img
                  src={formData.profile_picture}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: "#4A2F8F",
                  }}
                >
                  {formData.first_name?.charAt(0)}
                  {formData.last_name?.charAt(0)}
                </Avatar>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={onImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={triggerFileInput}
              disabled={uploading}
              startIcon={
                uploading ? (
                  <CircularProgress size={20} />
                ) : (
                  <AccountCircleIcon />
                )
              }
              sx={{
                borderColor: "#4A2F8F",
                color: "#4A2F8F",
              }}
            >
              {uploading ? "Uploading..." : "Change Photo"}
            </Button>
          </Box>

          {/* Form Fields */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={onInputChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={onInputChange}
              fullWidth
            />
          </Box>

          <TextField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={onInputChange}
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            fullWidth
          />

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              fullWidth
            />
            <TextField
              label="Birth Date"
              name="birth_date"
              type="date"
              value={formData.birth_date}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="#4A2F8F">
          Cancel
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          disabled={uploading}
          sx={{
            backgroundColor: "#4A2F8F",
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SettingsDialog;
