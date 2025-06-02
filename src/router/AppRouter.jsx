import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ProjectList from "../pages/ProjectList";
import ProjectDetails from "../pages/ProjectDetails";
import Profile from "../pages/Profile";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import CreateProject from "../pages/CreateProject";
import { BrowserRouter, Routes, Route } from "react-router";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}/>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/allproject" element={<ProjectList />} />
          <Route path="/projectdetails" element={<ProjectDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreateProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
