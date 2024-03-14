import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/Theme";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";
import authServiceInstance from "../services/AuthService";
import { CssBaseline, TextField, Button, Snackbar } from "@mui/material";
import courseServiceInstance from "../services/CourseService";
import { Link } from "react-router-dom";
import "../index.css";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "#" },
  { title: "Resources", url: "#" },
  { title: "Profile", url: "#" },
];

const CreateCourse = () => {
  const isAuthenticated = authServiceInstance.isAuthenticated();
  const isAdmin = authServiceInstance.isAdmin("admin@educonnect.sg");
  const [courseId, setCourseId] = useState(""); // Add courseId state
  const [semester, setSemester] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("User has a valid token:", isAuthenticated);
  console.log("User is an Admin", isAdmin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the course using courseServiceInstance
      await courseServiceInstance.createCourse({
        courseId, // Pass courseId to the createCourse function
        semester,
        title,
        description,
        videoUrl,
        attachmentUrl,
      });
      setSuccessMessage("Course was created successfully!");
      // Clear the form after successful submission
      setCourseId(""); // Clear courseId as well
      setSemester("");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setAttachmentUrl("");
      // You can also show a success message or redirect the user
    } catch (error) {
      setErrorMessage("Failed to create course!");
      console.error("Error:", error);
      // Handle error (show error message, etc.)
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={""} sections={sections} />
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
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              margin="normal"
            />
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
            <TextField
              fullWidth
              variant="outlined"
              label="Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Attachment URL"
              value={attachmentUrl}
              onChange={(e) => setAttachmentUrl(e.target.value)}
              margin="normal"
            />
            <br></br>
            <br></br>
            <Button type="submit" variant="contained" color="primary">
              Create Course
            </Button>
          </form>
        </main>
        <Snackbar
          open={!!successMessage || !!errorMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={successMessage || errorMessage}
          anchorOrigin={{ vertical: "top", horizontal: "right" }} // Snackbar appears at the top right corner
          ContentProps={{
            sx: {
              backgroundColor: successMessage ? "#4caf50" : "#f44336", // Change background color based on success or error message
            },
          }}
        />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default CreateCourse;
