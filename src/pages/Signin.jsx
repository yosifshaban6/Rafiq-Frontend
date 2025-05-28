import * as React from "react";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  FormLabel,
  FormControl,
  Link,
  Typography,
  Stack,
  TextField,
  Card as MuiCard,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  backgroundColor: "#a084e8",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const LeftSide = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(8),
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: theme.spacing(4),
  },
}));

const RightSide = styled("div")(({ theme }) => ({
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#a084e8",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: theme.spacing(4),
  },
}));

const RoundedTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  borderRadius: "20px",
  background: "#fff",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  color: "#000",
}));

export default function Login() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <CssBaseline />
      <Wrapper>
        <LeftSide>
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                color: "#a084e8",
              }}
            >
              Rafiq{" "}
              <VolunteerActivismIcon
                fontSize="large"
                sx={{ color: "#a084e8" }}
              />
            </Typography>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: "100%" }}
            >
              <FormControl fullWidth margin="normal">
                <FormLabel>Login</FormLabel>
                <RoundedTextField type="email" placeholder="Enter your email" />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel>Password</FormLabel>
                <RoundedTextField
                  type="password"
                  placeholder="Enter your password"
                />
              </FormControl>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#a084e8" }} />}
                  label="Remember"
                />
                <Link href="#" variant="body2" sx={{ color: "#a084e8" }}>
                  Forgot password?
                </Link>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  background: "#a084e8",
                  color: "#fff",
                  "&:hover": { background: "#9370db" },
                  py: 1.5,
                }}
              >
                Sign in
              </Button>

              <Typography mt={3} textAlign="center" variant="body2">
                Don’t have an account?{" "}
                <Link href="#" underline="hover" sx={{ color: "#a084e8" }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Card>
        </LeftSide>

        <RightSide>
          <Box
            component="img"
            src="/rafiq4.png"
            alt="Illustration"
            sx={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 3,
              boxShadow: isSmallScreen ? 3 : 0,
            }}
          />
        </RightSide>
      </Wrapper>
    </>
  );
}
