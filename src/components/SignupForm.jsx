import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Stack,
  MenuItem,
  Select,
  Alert,
  Collapse,
  CircularProgress,
} from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(7, "Phone number must be at least 7 digits")
    .required("Phone number is required"),
  countryCode: yup.string().required("Country code is required"),
  birthDate: yup
    .date()
    .required("Birth date is required")
    .max(new Date(), "Birth date cannot be in the future"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  profileImage: yup
    .mixed()
    .test("fileType", "Only JPEG and PNG images are allowed", (value) => {
      if (!value) return true;
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
});

const countryCodes = [
  { code: "+20", label: "EG" },
  { code: "+1", label: "US" },
  { code: "+44", label: "UK" },
  { code: "+971", label: "UAE" },
];

function SignupForm({ setConfirmOpen }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [apiErrors, setApiErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      countryCode: "+20",
      birthDate: "",
      password: "",
      confirmPassword: "",
      profileImage: null,
      address: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setApiErrors({});
      setGeneralError(null);

      try {
        formik.setSubmitting(true);
        const formData = new FormData();

        formData.append("username", values.email.split("@")[0]);
        formData.append("email", values.email);
        formData.append("phone", `${values.phoneNumber}`);
        formData.append("first_name", values.firstName);
        formData.append("last_name", values.lastName);
        formData.append("birth_date", values.birthDate);
        formData.append("password", values.password);
        formData.append("password2", values.confirmPassword);

        if (values.address) formData.append("address", values.address);
        if (values.profileImage) {
          formData.append("profile_image", values.profileImage);
        }

        await axios.post(`${VITE_SERVER_URL}/account/register/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        setConfirmOpen(true);
      } catch (error) {
        if (error.response) {
          const fieldErrors = {};
          Object.keys(error.response.data).forEach((key) => {
            const errorMessage = Array.isArray(error.response.data[key])
              ? error.response.data[key].join(" ")
              : error.response.data[key];

            const formField = mapServerFieldToFormField(key);
            if (formField) {
              fieldErrors[formField] = errorMessage;
            } else {
              setGeneralError(errorMessage);
            }
          });
          setApiErrors(fieldErrors);
        } else {
          setGeneralError(error.message || "An unexpected error occurred");
        }
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const mapServerFieldToFormField = (serverField) => {
    const fieldMap = {
      first_name: "firstName",
      last_name: "lastName",
      email: "email",
      phone: "phoneNumber",
      birth_date: "birthDate",
      password: "password",
      password2: "confirmPassword",
      profile_image: "profileImage",
    };
    return fieldMap[serverField] || null;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
        height: "100vh",
        p: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 480 }}>
        <Typography
          component="h1"
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 3, color: "#4a2f8f" }}
        >
          <VolunteerActivismIcon sx={{ mr: 1, fontSize: "36px" }} />
          Rafiq
        </Typography>

        <Collapse in={!!generalError}>
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setGeneralError(null)}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            {generalError}
          </Alert>
        </Collapse>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          noValidate
        >
          {formik.touched.profileImage && formik.errors.profileImage && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ mb: 2 }}
            >
              {formik.errors.profileImage}
            </Typography>
          )}

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              size="small"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                (formik.submitCount > 0 && formik.errors.firstName) ||
                apiErrors.firstName
              }
              helperText={
                (formik.submitCount > 0 && formik.errors.firstName) ||
                apiErrors.firstName
              }
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7b5fc9",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7b5fc9",
                },
              }}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              size="small"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={
                (formik.submitCount > 0 && formik.errors.lastName) ||
                apiErrors.lastName
              }
              helperText={
                (formik.submitCount > 0 && formik.errors.lastName) ||
                apiErrors.lastName
              }
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7b5fc9",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7b5fc9",
                },
              }}
            />
          </Stack>

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            type="email"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              (formik.submitCount > 0 && formik.errors.email) || apiErrors.email
            }
            helperText={
              (formik.submitCount > 0 && formik.errors.email) || apiErrors.email
            }
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7b5fc9",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#7b5fc9",
              },
            }}
          />

          <Stack direction="row" spacing={2} sx={{ my: 1 }}>
            <FormControl sx={{ width: "30%" }}>
              <InputLabel id="countryCode-label">Country Code</InputLabel>
              <Select
                labelId="countryCode-label"
                id="countryCode"
                name="countryCode"
                value={formik.values.countryCode}
                onChange={formik.handleChange}
                label="Country Code"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: 1,
                    "&.Mui-focused": {
                      borderColor: "#7b5fc9",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#7b5fc9",
                  },
                }}
              >
                {countryCodes.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    {option.code} ({option.label})
                  </MenuItem>
                ))}
              </Select>
              {formik.submitCount > 0 && formik.errors.countryCode && (
                <FormHelperText error>
                  {formik.errors.countryCode}
                </FormHelperText>
              )}
            </FormControl>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              size="small"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                (formik.submitCount > 0 && formik.errors.phoneNumber) ||
                apiErrors.phoneNumber
              }
              helperText={
                (formik.submitCount > 0 && formik.errors.phoneNumber) ||
                apiErrors.phoneNumber
              }
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7b5fc9",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7b5fc9",
                },
              }}
            />
          </Stack>

          <TextField
            fullWidth
            id="address"
            name="address"
            label="Address (Optional)"
            size="small"
            value={formik.values.address}
            onChange={formik.handleChange}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7b5fc9",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#7b5fc9",
              },
            }}
          />

          <TextField
            fullWidth
            id="birthDate"
            name="birthDate"
            label="Birth Date"
            type="date"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            error={
              (formik.submitCount > 0 && formik.errors.birthDate) ||
              apiErrors.birthDate
            }
            helperText={
              (formik.submitCount > 0 && formik.errors.birthDate) ||
              apiErrors.birthDate
            }
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7b5fc9",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#7b5fc9",
              },
            }}
          />

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7b5fc9",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#7b5fc9",
              },
            }}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                (formik.submitCount > 0 && formik.errors.password) ||
                apiErrors.password
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {formik.submitCount > 0 && formik.errors.password && (
              <FormHelperText error>{formik.errors.password}</FormHelperText>
            )}
            {apiErrors.password && (
              <FormHelperText error>{apiErrors.password}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7b5fc9",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#7b5fc9",
              },
            }}
          >
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                (formik.submitCount > 0 && formik.errors.confirmPassword) ||
                apiErrors.confirmPassword
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
            {formik.submitCount > 0 && formik.errors.confirmPassword && (
              <FormHelperText error>
                {formik.errors.confirmPassword}
              </FormHelperText>
            )}
            {apiErrors.confirmPassword && (
              <FormHelperText error>{apiErrors.confirmPassword}</FormHelperText>
            )}
          </FormControl>

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
                  "&:hover": {
                    borderColor: "#4a2f8f",
                  },
                }}
              >
                Upload Profile Image (PNG/JPG)
                <input
                  type="file"
                  name="profileImage"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
              </Button>
              {formik.submitCount > 0 && formik.errors.profileImage && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {formik.errors.profileImage}
                </FormHelperText>
              )}
              {apiErrors.profileImage && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {apiErrors.profileImage}
                </FormHelperText>
              )}
              {formik.values.profileImage && (
                <Typography
                  variant="caption"
                  color="#4a2f8f"
                  sx={{ mt: 1, display: "block" }}
                >
                  Selected file: {formik.values.profileImage.name}
                </Typography>
              )}
            </FormControl>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              fontSize: "1rem",
              background: "#7b5fc9",
              "&:hover": {
                background: "#4a2f8f",
              },
            }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link
              to="/signin"
              style={{
                textDecoration: "none",
                fontWeight: 500,
                color: "#4a2f8f",
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupForm;
