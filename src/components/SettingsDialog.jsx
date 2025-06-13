import React from "react";
import axios from "axios"; // Import Axios
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

function SettingsDialog({ open, onClose, onSave, formData, onInputChange }) {
  const handleSave = async () => {
    try {
      onSave();
      // Replace 'your-api-endpoint' with the actual API endpoint
      const response = await axios.put(`${VITE_SERVER_URL}/settings`, formData);
      console.log("Settings updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: "#4A2F8F", fontWeight: 600 }}>
        Account Settings
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mb: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="first_name"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.first_name}
            onChange={onInputChange}
          />
          <TextField
            margin="dense"
            name="last_name"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.last_name}
            onChange={onInputChange}
          />
        </Box>
        <TextField
          margin="dense"
          name="profile_picture"
          label="Profile Picture URL"
          type="url"
          fullWidth
          variant="outlined"
          value={formData.profile_picture}
          onChange={onInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          name="bio"
          label="Bio"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          value={formData.bio}
          onChange={onInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.address}
          onChange={onInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          name="birth_date"
          label="Birth Date"
          type="date"
          fullWidth
          variant="outlined"
          value={formData.birth_date}
          onChange={onInputChange}
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="tel"
          fullWidth
          variant="outlined"
          value={formData.phone}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#4A2F8F" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSave} // Use the new handleSave function
          variant="contained"
          sx={{
            backgroundColor: "#4A2F8F",
            "&:hover": { backgroundColor: "#3a226f" },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SettingsDialog;
