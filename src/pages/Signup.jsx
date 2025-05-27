import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const FullPageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: "auto",
  },
}));

const LeftSide = styled("div")(({ theme }) => ({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#a084e8",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "200px",
  },
}));

const RightSide = styled("div")(({ theme }) => ({
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  padding: theme.spacing(4),
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

const RoundedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
}));

export default function SignUp() {
  return (
    <>
      <CssBaseline />
      <FullPageContainer>
        <LeftSide>
          <Box
            component="img"
            src="/rafiq4.png"
            alt="Illustration"
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </LeftSide>

        <RightSide>
          <Card>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 1,
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
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <RoundedTextField fullWidth placeholder="First Name" />
              </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <RoundedTextField fullWidth placeholder="Last Name" />
              </FormControl>

              <FormControl>
                <FormLabel>Username</FormLabel>
                <RoundedTextField fullWidth placeholder="Username" />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <RoundedTextField
                  fullWidth
                  placeholder="Enter your@email.com"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <RoundedTextField
                  fullWidth
                  type="password"
                  placeholder="Enter your password"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <RoundedTextField
                  fullWidth
                  type="password"
                  placeholder="Confirm your password"
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox sx={{ color: "#a084e8" }} />}
                label="I want to receive updates via email."
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  background: "#a084e8",
                  color: "#fff",
                  "&:hover": {
                    background: "#9370db",
                  },
                }}
              >
                Register
              </Button>
            </Box>

            <Divider>
              <Typography>or</Typography>
            </Divider>

            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="#" underline="hover" sx={{ color: "#a084e8" }}>
                Sign in
              </Link>
            </Typography>
          </Card>
        </RightSide>
      </FullPageContainer>
    </>
  );
}
