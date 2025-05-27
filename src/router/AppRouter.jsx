import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Project_list from "../pages/Project_List";
import Projectdetails from "../pages/Projectdetails";

import { BrowserRouter, Routes, Route } from "react-router";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allproject" element={<Project_list />} />
        <Route path="/projectdetails" element={<Projectdetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
