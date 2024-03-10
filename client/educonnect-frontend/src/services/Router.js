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

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
