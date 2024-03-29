import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import theme from "../themes/Theme";
import authServiceInstance from "../services/AuthService";
import analyticsServiceInstance from "../services/AnalyticsService";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Typography from "@mui/material/Typography";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "/analytics" },
  { title: "Resources", url: "#" },
  { title: "Profile", url: "#" },
];

export default function Analytics() {
  const isAdmin = authServiceInstance.isAdmin("admin@educonnect.sg");
  const isAuthenticated = authServiceInstance.isAuthenticated();
  console.log("User has a valid token:", isAuthenticated);
  console.log("User is an Admin", isAdmin);
  const email = localStorage.getItem("email");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalEnrolledUsers, setTotalEnrolledUsers] = useState(0);
  const [coursesByEmail, setCoursesByEmail] = useState(0); // State to hold enrolled courses by email

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalCoursesData =
          await analyticsServiceInstance.getTotalCourses();
        setTotalCourses(totalCoursesData.totalCount);

        const totalEnrolledUsersData =
          await analyticsServiceInstance.getTotalEnrolledUsers();
        setTotalEnrolledUsers(totalEnrolledUsersData.totalUsers);

        const coursesByEmailData =
          await analyticsServiceInstance.getEnrolledCoursesByEmail(email);
        setCoursesByEmail(coursesByEmailData.courseCount);
      } catch (error) {
        handleFetchError(error, "data");
      }
    };

    fetchData();

    return () => {};
  }, [email]);

  const handleFetchError = (error, context) => {
    console.error(`Error fetching data for ${context}:`, error);
    setSnackbarMessage(`Error fetching data for ${context}`);
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title={""} sections={sections} />
      <Container>
        <Container>
          <Typography>Total Courses: {totalCourses}</Typography>
          <Typography>Total Enrolled Users: {totalEnrolledUsers}</Typography>
          <Typography>
            Total Enrolled Courses by Email: {coursesByEmail}
          </Typography>
        </Container>
      </Container>
      <Footer />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          sx={{
            backgroundColor:
              snackbarSeverity === "error"
                ? theme.palette.error.main
                : theme.palette.success.main,
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </ThemeProvider>
  );
}
