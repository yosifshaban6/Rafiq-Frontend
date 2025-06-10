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
} from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      formik.setSubmitting(true);
      axios
        .post(`${VITE_SERVER_URL}/account/login/`, values)
        .then((response) => {
          const token = response.data.access;
          console.log("Login successful:", token);
          localStorage.setItem("token", token);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log("Login error:", error);
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            type="email"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
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
            {formik.touched.password && formik.errors.password && (
              <FormHelperText error>{formik.errors.password}</FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              my: 2,
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              fontSize: "1rem",
              background: "#7b5fc9",
            }}
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Sign In
          </Button>

          <Typography variant="body2" align="center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              underline="hover"
              sx={{ fontWeight: 500, color: "#4a2f8f" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SigninForm;
