import { useRef } from "react";
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
  initialData,
  onImageUpload,
  uploading,
}) {
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const triggerFileInput = () => fileInputRef.current.click();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    // Combine with the existing profile picture (if not changed)
    const dataToSave = {
      ...formValues,
      profile_picture: initialData.profile_picture,
    };

    onSave(dataToSave);
  };

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

      <form ref={formRef} onSubmit={handleSubmit}>
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
                {initialData.profile_picture ? (
                  <img
                    src={initialData.profile_picture}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: "100%",
                      height: "100%",
                      bgcolor: "#4A2F8F",
                    }}
                  >
                    {initialData.first_name?.charAt(0)}
                    {initialData.last_name?.charAt(0)}
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
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="First Name"
                name="first_name"
                defaultValue={initialData.first_name}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="last_name"
                defaultValue={initialData.last_name}
                fullWidth
              />
            </Box>

            <TextField
              label="Bio"
              name="bio"
              defaultValue={initialData.bio}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              label="Address"
              name="address"
              defaultValue={initialData.address}
              fullWidth
            />

            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="Phone"
                name="phone"
                defaultValue={initialData.phone}
                fullWidth
              />
              <TextField
                label="Birth Date"
                name="birth_date"
                type="date"
                defaultValue={initialData.birth_date}
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
            type="submit"
            variant="contained"
            disabled={uploading}
            sx={{
              backgroundColor: "#4A2F8F",
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SettingsDialog;
