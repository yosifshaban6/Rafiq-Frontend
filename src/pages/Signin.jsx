import { Box, Container, Paper, Stack, Avatar } from "@mui/material";
import SigninForm from "../components/SigninForm";
import signin_image from "../assets/signin.jpg";

function Signin() {
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
            {/* Form Section */}
            <SigninForm />

            <Box
              sx={{
                width: "50%",
                display: { xs: "none", md: "block" },
                position: "relative",
                height: "100vh",
              }}
            >
              <Avatar
                src={signin_image}
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
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default Signin;
