import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import { Box, Container, Paper, Stack, Avatar } from "@mui/material";
import SignupForm from "../components/SignupForm";
import signup_image from "../assets/signup.jpg";

function Signup() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    setConfirmOpen(false);
    window.location.href = "/signin";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#f5f5fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        m: 0,
      }}
    >
      <Container
        component="main"
        maxWidth="lg"
        disableGutters
        sx={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          height: "100vh",
          minWidth: "100vw",
          p: 0,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 0,
            flexGrow: 1,
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
          }}
        >
          <Stack direction="row" sx={{ height: "100%", width: "100%" }}>
            <Box
              sx={{
                width: "50%",
                display: { xs: "none", md: "block" },
                position: "relative",
                height: "100vh",
              }}
            >
              <Avatar
                src={signup_image}
                variant="square"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  opacity: 0.7,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg,#7b5fc996 0%, #4a2f8f 100%)",
                  opacity: 0.6,
                  zIndex: 2,
                }}
              />
            </Box>

            {/* Form Section */}
            <SignupForm setConfirmOpen={setConfirmOpen} />
          </Stack>
        </Paper>
      </Container>
      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Your Email"
        description="A confirmation link was sent to your email—please check your inbox and click the link to verify."
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}

export default Signup;
