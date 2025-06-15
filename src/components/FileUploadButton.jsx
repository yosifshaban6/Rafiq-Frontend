import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";

function FileUploadButton({ formik, handleImageChange }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <FormControl fullWidth margin="normal">
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 1,
            borderColor: "#7b5fc9",
            textTransform: "none",
            color: "#7b5fc9",
          }}
        >
          Upload Images (PNG/JPG)
          <input
            type="file"
            name="image"
            hidden
            accept="image/png, image/jpeg"
            multiple
            onChange={handleImageChange}
          />
        </Button>
        {formik.touched.image && formik.errors.image && (
          <FormHelperText error sx={{ mt: 1 }}>
            {formik.errors.image}
          </FormHelperText>
        )}
        {formik.values.image && formik.values.image.length > 0 && (
          <Typography
            variant="caption"
            color="#4a2f8f"
            sx={{ mt: 1, display: "block" }}
          >
            Selected files:{" "}
            {Array.from(formik.values.image)
              .map((file) => file.name)
              .join(", ")}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
}

export default FileUploadButton;
