import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ProjectList from "../pages/ProjectList";
import ProjectDetails from "../pages/ProjectDetails";
import Profile from "../pages/Profile";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import CreateProject from "../pages/CreateProject";
import EditProject from "../pages/EditProject";
import About from "../pages/About";
import ForgetPassword from "../pages/ForgetPass";
import ResetPass from "../pages/ResetPass";
import Contact from "../pages/Contact";
import Success from "../pages/Success";
import { BrowserRouter, Routes, Route } from "react-router";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<ResetPass />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/allproject" element={<ProjectList />} />
          <Route path="/projectdetails" element={<ProjectDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreateProject />} />
          <Route path="/edit" element={<EditProject />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success" element={<Success />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
