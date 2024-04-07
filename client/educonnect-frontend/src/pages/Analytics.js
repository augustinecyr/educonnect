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
import BarChart from "../components/BarChart";
import DonutChart from "../components/DonutChart";
import RadarChart from "../components/RadarChart";
import LineGraph from "../components/LineGraph";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "/analytics" },
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
  const [coursesByEmail, setCoursesByEmail] = useState(0);
  const [barChartData, setBarChartData] = useState([]);
  const [donutChartData, setDonutChartData] = useState([]);
  const [radarChartData, setRadarChartData] = useState([]);
  const lineGraphData = [
    { month: "January", calls: 100 },
    { month: "February", calls: 200 },
    { month: "March", calls: 150 },
    { month: "April", calls: 300 },
    { month: "May", calls: 250 },
    { month: "June", calls: 400 },
    { month: "July", calls: 350 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const totalCoursesData =
            await analyticsServiceInstance.getTotalCourses();
          setTotalCourses(totalCoursesData.totalCount);

          const totalEnrolledUsersData =
            await analyticsServiceInstance.getTotalEnrolledUsers();
          setTotalEnrolledUsers(totalEnrolledUsersData.totalUsers);

          const coursesByEmailData =
            await analyticsServiceInstance.getEnrolledCoursesByEmail(email);
          setCoursesByEmail(coursesByEmailData.courseCount);
        }

        const barChartData = [
          { year: 2020, count: 13813 },
          { year: 2021, count: 18032 },
          { year: 2022, count: 24088 },
          { year: 2023, count: 39521 },
          { year: 2024, count: 50000 },
        ];
        setBarChartData(barChartData);

        const donutChartData = {
          labels: ["Total Courses Available", "Courses Enrolled"],
          datasets: [
            {
              label: "Total",
              data: [totalCourses, coursesByEmail],
              backgroundColor: ["rgb(251, 188, 5)", "rgb(52, 168, 83)"],
              hoverOffset: 4,
            },
          ],
        };
        setDonutChartData(donutChartData);

        const radarChartData = {
          labels: [
            "Web Development",
            "Data Science",
            "Computer Networking",
            "Cybersecurity",
            "Machine Learning",
            "UI/UX Design",
            "Software Engineering",
          ],
          datasets: [
            {
              label: "Average Quiz Scores",
              data: [85, 70, 80, 75, 90, 60, 95],
              fill: true,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 99, 132)",
            },
            {
              label: "Assignment Completion Rate (%)",
              data: [95, 85, 90, 80, 70, 75, 100],
              fill: true,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgb(54, 162, 235)",
              pointBackgroundColor: "rgb(54, 162, 235)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(54, 162, 235)",
            },
          ],
        };
        setRadarChartData(radarChartData);
      } catch (error) {
        handleFetchError(error, "data");
      }
    };

    fetchData();

    return () => {};
  }, [email, totalCourses, totalEnrolledUsers, coursesByEmail]);

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
        <br></br>
        <Typography variant="h4" gutterBottom>
          Analytics Overview
        </Typography>
        <Typography variant="body1" gutterBottom>
          Here's a breakdown of important analytics on EduConnect.
        </Typography>

        <Container>
          <div style={{ marginBottom: "40px" }}>
            <Typography variant="h6">Course Enrollment Trends</Typography>
            <BarChart data={barChartData} />
            <Typography variant="body2">
              This chart illustrates the upward trend in course enrollments over
              the years, particularly accentuated during and post the pandemic.
              It reflects the surge in website traffic as remote learning became
              prevalent, emphasizing the growing significance of online
              platforms for education.
            </Typography>
          </div>
          {!isAdmin && (
            <div style={{ marginBottom: "40px" }}>
              <Typography variant="h6">
                Your Learning Journey Overview
              </Typography>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <DonutChart data={donutChartData} />
                </div>
                <div style={{ flex: 1 }}>
                  <RadarChart data={radarChartData}></RadarChart>
                </div>
              </div>
            </div>
          )}
          {isAdmin && (
            <div style={{ marginBottom: "40px" }}>
              <Typography variant="h6">Number of API Calls</Typography>
              <LineGraph data={lineGraphData}></LineGraph>
            </div>
          )}
        </Container>
      </Container>
      <br></br>
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
