import Login from "../pages/Login";
import Signup from "../pages/Signup";

import { BrowserRouter, Routes, Route } from "react-router";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
