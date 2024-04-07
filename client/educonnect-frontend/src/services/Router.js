import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import RegisterUser from "../pages/RegisterUser";
import Courses from "../pages/Courses";
import ResetPassword from "../pages/ResetPassword";
import ManageCourses from "../components/ManageCourses";
import CreateCourse from "../components/CreateCourse";
import PrivateRoutes from "./PrivateRoutes";
import EnrollCourse from "../components/EnrollCourse";
import MyCourses from "../pages/MyCourses";
import Analytics from "../pages/Analytics";
import AdminRoutes from "./AdminRoutes";
import Settings from "../pages/Settings";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        
        <Route element={<PrivateRoutes />}>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/enroll/:courseId" element={<EnrollCourse />} />
          <Route path="/courses/:email" element={<MyCourses />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/courses/manage" element={<ManageCourses />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/edit/:courseId" element={<ManageCourses />} />
          <Route path="/courses/delete/:courseId" element={<ManageCourses />} />
          <Route path="/courses/preview/:courseId" element={<EnrollCourse />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
