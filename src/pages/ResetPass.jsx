import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useNavigate } from "react-router-dom";

const FullPageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "auto",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: "auto",
  },
}));

const LeftSide = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#a084e8",
  [theme.breakpoints.down("sm")]: {
    height: "250px",
  },
}));

const RightSide = styled("div")(({ theme }) => ({
  flex: 1,
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

export default function ResetPass() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // يمكنك إضافة التحقق من كلمة السر هنا
    navigate("/signin");
  };

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
              width: "100%",
              height: "100%",
              objectFit: "cover",
              maxHeight: { xs: "250px", sm: "100%" },
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
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <RoundedTextField
                  fullWidth
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <RoundedTextField
                  fullWidth
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </FormControl>

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
                Login
              </Button>
            </Box>
          </Card>
        </RightSide>
      </FullPageContainer>
    </>
  );
}
