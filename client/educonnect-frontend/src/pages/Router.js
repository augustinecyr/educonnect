import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import RegisterUser from "./RegisterUser";
import Courses from "./Courses";

function AppRouter() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterUser/>} />
        <Route path="/courses" element={<Courses/>} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
