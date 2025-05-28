import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProjectList from "../pages/ProjectList";
import ProjectDetails from "../pages/ProjectDetails";

import { BrowserRouter, Routes, Route } from "react-router";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allproject" element={<ProjectList />} />
        <Route path="/projectdetails" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
