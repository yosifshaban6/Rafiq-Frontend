import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function ConfirmDialog({ open, title, description, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            role="img"
            aria-label="congratulations"
            style={{ fontSize: 28 }}
          >
            🎉
          </span>
          {title}
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7b5fc9" }}
          onClick={onConfirm}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
