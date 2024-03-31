import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/Theme";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";
import authServiceInstance from "../services/AuthService";
import {
  CssBaseline,
  TextField,
  Button,
  Snackbar,
  Select,
  MenuItem,
} from "@mui/material";
import courseServiceInstance from "../services/CourseService";
import { Link } from "react-router-dom";
import "../index.css";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "/analytics" },
  { title: "Resources", url: "#" },
  { title: "Profile", url: "#" },
];

const CreateCourse = () => {
  const isAuthenticated = authServiceInstance.isAuthenticated();
  const isAdmin = authServiceInstance.isAdmin("admin@educonnect.sg");
  const [courseId, setCourseId] = useState("");
  const [semester, setSemester] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [semesters, setSemesters] = useState([]);

  console.log("User has a valid token:", isAuthenticated);
  console.log("User is an Admin", isAdmin);

  useEffect(() => {
    async function fetchSemesters() {
      try {
        const semestersData = await courseServiceInstance.fetchSemesters();
        setSemesters(semestersData);
        console.log(semestersData);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    }
    fetchSemesters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await courseServiceInstance.createCourse({
        courseId,
        semester,
        title,
        description,
      });
      setSuccessMessage("Course was created successfully!");
      setCourseId("");
      setSemester("");
      setTitle("");
      setDescription("");
    } catch (error) {
      setErrorMessage("Failed to create course!");
      console.error("Error:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title={""} sections={sections} />
      <Container maxWidth="lg">
        <br />
        <main>
          <Link to="/courses/manage">
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: "1rem" }}
            >
              Back
            </Button>
          </Link>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Course ID"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              margin="normal"
              required
              placeholder="EDUXXXX (e.g., EDU001)"
              InputProps={{
                inputProps: {
                  pattern: "EDU[0-9]{4}", // Enforces the format COURSEXXXX
                },
              }}
            />
            <Select
              fullWidth
              variant="outlined"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              displayEmpty
              margin="normal"
            >
              <MenuItem value="" disabled>
                Select Semester
              </MenuItem>
              {semesters.map((semesterValue, index) => (
                <MenuItem key={index} value={semesterValue}>
                  {semesterValue}
                </MenuItem>
              ))}
            </Select>
            <TextField
              fullWidth
              variant="outlined"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              rows={4}
              margin="normal"
            />
            <br></br>
            <br></br>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!courseId || !semester || !title || !description}
            >
              Create Course
            </Button>
          </form>
        </main>
        <Snackbar
          open={!!successMessage || !!errorMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={successMessage || errorMessage}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          ContentProps={{
            sx: {
              backgroundColor: successMessage ? "#4caf50" : "#f44336",
            },
          }}
        />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default CreateCourse;
