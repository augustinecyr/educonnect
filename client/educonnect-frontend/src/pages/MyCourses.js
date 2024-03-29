import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import theme from "../themes/Theme";
import authServiceInstance from "../services/AuthService";
import courseServiceInstance from "../services/CourseService";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "#" },
  { title: "Resources", url: "#" },
  { title: "Profile", url: "#" },
];

export default function MyCourses() {
  const [userCourses, setUserCourses] = useState([]);
  const isAdmin = authServiceInstance.isAdmin("admin@educonnect.sg");
  const isAuthenticated = authServiceInstance.isAuthenticated();
  console.log("User has a valid token:", isAuthenticated);
  console.log("User is an Admin", isAdmin);
  const email = localStorage.getItem("email");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrollmentList =
          await courseServiceInstance.fetchEnrollmentList();
        const userEnrollments = enrollmentList.filter(
          (enrollment) => enrollment.email === email
        );
        const userCourseIds = userEnrollments.map(
          (enrollment) => enrollment.courseId
        );
        setUserCourses(userCourseIds);

        setSnackbarMessage("Enrollment list fetched successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error fetching enrollment list:", error);
        setSnackbarMessage("Error fetching enrollment list");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchData();
  }, [email]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title={""} sections={sections} />
      <Container maxWidth="lg">
        <br />
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center">
              Enrolled Courses
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Course ID</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userCourses.map((courseId, index) => (
                    <TableRow key={index}>
                      <TableCell>{courseId}</TableCell>
                      <TableCell>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
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
