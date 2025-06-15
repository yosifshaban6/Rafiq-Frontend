import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  Checkbox,
  MenuItem,
  ListItemText,
  InputAdornment,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FileUploadButton from "../components/FileUploadButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  category_id: Yup.string().required("Category is required"),
  tag_ids: Yup.array().min(1, "At least one tag is required"),
  target_amount: Yup.number()
    .typeError("Target amount must be a number")
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
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Load categories from server
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

    // Load tags from server
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
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      // Append simple fields
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("category_id", values.category_id);
      formData.append("target_amount", values.target_amount);
      formData.append("start_time", values.start_time.toISOString());
      formData.append("end_time", values.end_time.toISOString());

      // Append each tag_id separately
      values.tag_ids.forEach((tagId) => {
        formData.append("tag_ids", tagId);
      });

      // Append each image file
      values.images.forEach((imageFile) => {
        formData.append("images", imageFile);
      });

      console.log("Submitting form data:", formData);

      // Post the data
      axios
        .post(`${VITE_SERVER_URL}/funding/posts/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error creating project:", error);
        });
    },
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("images", files);

    const imageUrls = files.map((file) => URL.createObjectURL(file));
    formik.setFieldValue("imagePreviews", imageUrls);
  };

  if (loading.categories || loading.tags) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Create Post
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          label="Content"
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
          multiline
          rows={4}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
        />
        <FormControl
          fullWidth
          margin="normal"
          error={
            formik.touched.category_id && Boolean(formik.errors.category_id)
          }
        >
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={formik.values.category_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="category_id"
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.category_id && formik.errors.category_id && (
            <FormHelperText>{formik.errors.category_id}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          margin="normal"
          error={formik.touched.tag_ids && Boolean(formik.errors.tag_ids)}
        >
          <InputLabel id="tags-label">Tags</InputLabel>
          <Select
            multiple
            labelId="tags-label"
            value={formik.values.tag_ids}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="tag_ids"
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
                <Checkbox checked={formik.values.tag_ids.includes(tag.id)} />
                <ListItemText primary={tag.name} />
              </MenuItem>
            ))}
          </Select>
          {formik.touched.tag_ids && formik.errors.tag_ids && (
            <FormHelperText>{formik.errors.tag_ids}</FormHelperText>
          )}
        </FormControl>

        <TextField
          type="number"
          fullWidth
          label="Target Amount"
          name="target_amount"
          value={formik.values.target_amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          error={
            formik.touched.target_amount && Boolean(formik.errors.target_amount)
          }
          helperText={
            formik.touched.target_amount && formik.errors.target_amount
          }
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <DateTimePicker
              label="Start Time"
              value={formik.values.start_time}
              onChange={(value) => formik.setFieldValue("start_time", value)}
              onBlur={formik.handleBlur}
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
              sx={{ flexGrow: 1 }}
            />
            <DateTimePicker
              label="End Time"
              value={formik.values.end_time}
              onChange={(value) => formik.setFieldValue("end_time", value)}
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={
                    formik.touched.end_time && Boolean(formik.errors.end_time)
                  }
                  helperText={formik.touched.end_time && formik.errors.end_time}
                />
              )}
              sx={{ flexGrow: 1 }}
            />
          </Box>
        </LocalizationProvider>

        <Box sx={{ marginY: 2 }}>
          <FileUploadButton
            formik={formik}
            handleImageChange={handleImageUpload}
          />
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {formik.values.imagePreviews?.map((url, index) => (
              <Grid item key={index}>
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
              </Grid>
            ))}
          </Grid>
          {formik.touched.imagePreviews && formik.errors.imagePreviews && (
            <Typography color="error" variant="caption">
              {formik.errors.imagePreviews}
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ bgcolor: "#7b5fc9", mt: 2 }}
          fullWidth
          type="submit"
        >
          Create Post
        </Button>
      </form>
    </Box>
  );
}

export default CreateProject;
