import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import {
  LocalConvenienceStoreOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

const validationSchema = yup.object({
  password1: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password1"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  console.log(token);

  const formik = useFormik({
    initialValues: {
      password1: "",
      password2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setError("");
      if (!token) {
        setError("Invalid reset link. Please request a new one.");
        setSubmitting(false);
        return;
      }

      axios
        .post(`${VITE_SERVER_URL}/account/password-reset/${token}/`, {
          password: values.password1,
          password2: values.password2,
        })
        .then(() => {
          setSuccess(true);
        })
        .catch((err) => {
          setError(
            err.response?.data?.message ||
              "Failed to reset password. Please try again."
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "ceneter",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 600, mb: 3, color: "#4a2f8f" }}
        >
          <VolunteerActivismIcon sx={{ mr: 1, fontSize: "36px" }} />
          Rafiq
        </Typography>

        {success ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Password Reset Successful
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your password has been successfully reset. You can now sign in
              with your new password.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/signin")}
              sx={{
                background: "#7b5fc9",
                "&:hover": { background: "#6a4eb5" },
              }}
            >
              Sign In
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Reset Password
            </Typography>
            <Typography variant="body1">
              Please enter your new password below.
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{ width: "100%", mt: 1 }}
            >
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={
                  formik.touched.password1 && Boolean(formik.errors.password1)
                }
              >
                <InputLabel htmlFor="password1">New Password</InputLabel>
                <OutlinedInput
                  id="password1"
                  name="password1"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New Password"
                />
                {formik.touched.password1 && formik.errors.password1 && (
                  <FormHelperText>{formik.errors.password1}</FormHelperText>
                )}
              </FormControl>

              <TextField
                fullWidth
                id="password2"
                name="password2"
                label="Confirm New Password"
                type="password"
                value={formik.values.password2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password2 && Boolean(formik.errors.password2)
                }
                helperText={formik.touched.password2 && formik.errors.password2}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={formik.isSubmitting || !formik.isValid}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  background: "#7b5fc9",
                  "&:hover": { background: "#6a4eb5" },
                }}
              >
                {formik.isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Reset Password"
                )}
              </Button>

              <Typography variant="body2" align="center">
                Remember your password?{" "}
                <Link to="/signin" sx={{ fontWeight: 500, color: "#4a2f8f" }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default ResetPassword;
