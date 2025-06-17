import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  Checkbox,
  MenuItem,
  ListItemText,
  InputAdornment,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
  Alert,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

// Create theme with #4A2F8F as primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#4A2F8F",
      light: "#7b5fc9",
      dark: "#3A1F7F",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6a4eb5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 16px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#4A2F8F",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#4A2F8F",
          },
        },
      },
    },
  },
});

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  category_id: Yup.string().required("Category is required"),
  tag_ids: Yup.array().min(1, "At least one tag is required"),
  target_amount: Yup.number()
    .typeError("Target amount must be a number")
    .positive("Target amount must be positive")
    .required("Target amount is required"),
  start_time: Yup.date().nullable().required("Start time is required"),
  end_time: Yup.date()
    .nullable()
    .required("End time is required")
    .min(Yup.ref("start_time"), "End time must be after start time"),
  images: Yup.array().min(1, "At least one image is required"),
});

function CreateProject() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState({
    categories: true,
    tags: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${VITE_SERVER_URL}/funding/categories/`)
      .then((response) => {
        setCategories(response.data.results);
        setLoading((prev) => ({ ...prev, categories: false }));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading((prev) => ({ ...prev, categories: false }));
      });

    axios
      .get(`${VITE_SERVER_URL}/funding/tags/`)
      .then((response) => {
        setTags(response.data.results);
        setLoading((prev) => ({ ...prev, tags: false }));
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        setLoading((prev) => ({ ...prev, tags: false }));
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category_id: "",
      tag_ids: [],
      target_amount: "",
      start_time: null,
      end_time: null,
      images: [],
      imagePreviews: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        console.log(values);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("category_id", values.category_id);
        formData.append("target_amount", values.target_amount);
        formData.append("start_time", values.start_time.toISOString());
        formData.append("end_time", values.end_time.toISOString());
        values.tag_ids.forEach((tagId) => formData.append("tags", tagId));
        values.images.forEach((image) => formData.append("images", image));

        const response = await axios.post(
          `${VITE_SERVER_URL}/funding/posts/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        navigate(`/posts/${response.data.id}`);
      } catch (error) {
        console.error("Error creating project:", error);
        if (error.response?.data) {
          Object.entries(error.response.data).forEach(([field, errors]) => {
            const errorMessage = Array.isArray(errors)
              ? errors.join(" ")
              : errors;
            formik.setFieldError(
              field === "non_field_errors" ? "form" : field,
              errorMessage
            );
          });

          if (error.response.data.non_field_errors) {
            setSubmitError(error.response.data.non_field_errors.join(" "));
          }
        } else {
          setSubmitError("Failed to create project. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      formik.setFieldValue("images", files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      formik.setFieldValue("imagePreviews", imageUrls);
    }
  };

  if (loading.categories || loading.tags) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 600, margin: "0 auto", p: 3 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          color="primary"
          sx={{ mb: 3 }}
        >
          Create New Project
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              fullWidth
              label="Project Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <TextField
              fullWidth
              label="Project Description"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              multiline
              rows={6}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />

            <FormControl
              fullWidth
              error={
                formik.touched.category_id && Boolean(formik.errors.category_id)
              }
            >
              <InputLabel>Category</InputLabel>
              <Select
                name="category_id"
                value={formik.values.category_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.category_id && formik.errors.category_id}
              </FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              error={formik.touched.tag_ids && Boolean(formik.errors.tag_ids)}
            >
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                name="tag_ids"
                value={formik.values.tag_ids}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Tags"
                renderValue={(selected) => {
                  const selectedTags = tags.filter((tag) =>
                    selected.includes(tag.id)
                  );
                  return selectedTags.map((tag) => tag.name).join(", ");
                }}
              >
                {tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    <Checkbox
                      checked={formik.values.tag_ids.includes(tag.id)}
                      color="primary"
                    />
                    <ListItemText primary={tag.name} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.tag_ids && formik.errors.tag_ids}
              </FormHelperText>
            </FormControl>

            <TextField
              fullWidth
              type="number"
              label="Funding Goal ($)"
              name="target_amount"
              value={formik.values.target_amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              error={
                formik.touched.target_amount &&
                Boolean(formik.errors.target_amount)
              }
              helperText={
                formik.touched.target_amount && formik.errors.target_amount
              }
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Time"
                value={formik.values.start_time}
                onChange={(value) => formik.setFieldValue("start_time", value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={
                      formik.touched.start_time &&
                      Boolean(formik.errors.start_time)
                    }
                    helperText={
                      formik.touched.start_time && formik.errors.start_time
                    }
                  />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Time"
                value={formik.values.end_time}
                onChange={(value) => formik.setFieldValue("end_time", value)}
                minDateTime={formik.values.start_time}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={
                      formik.touched.end_time && Boolean(formik.errors.end_time)
                    }
                    helperText={
                      formik.touched.end_time && formik.errors.end_time
                    }
                  />
                )}
              />
            </LocalizationProvider>

            <FormControl fullWidth>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ py: 2, borderColor: "primary.main" }}
              >
                Upload Project Images
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              <FormHelperText>
                {formik.touched.images && formik.errors.images}
              </FormHelperText>
            </FormControl>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {formik.values.imagePreviews?.map((url, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "primary.light",
                  }}
                >
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isSubmitting || !formik.isValid}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Project"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
}

export default CreateProject;
