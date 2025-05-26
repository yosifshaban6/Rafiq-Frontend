import { Login } from "@mui/icons-material";
import { BrowserRouter, Routes, Route } from "react-router";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<h1>Register Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
