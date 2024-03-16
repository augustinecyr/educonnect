import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/Theme";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";
import authServiceInstance from "../services/AuthService";
import {
  CssBaseline,
  Button,
  List,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Snackbar,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import courseServiceInstance from "../services/CourseService";
import { useLocation } from "react-router-dom";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "#" },
  { title: "Resources", url: "#" },
  { title: "Profile", url: "#" },
];

const ManageCourses = () => {
  const isAuthenticated = authServiceInstance.isAuthenticated();
  const [isAdmin, setIsAdmin] = useState(false);
  const [semester, setSemester] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [courses, setCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const selectedCourse = location.state?.course;
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  console.log("User has a valid token:", isAuthenticated);
  console.log("User is an Admin", isAdmin);

  useEffect(() => {
    setIsAdmin(authServiceInstance.isAdmin("admin@educonnect.sg"));
    fetchCoursesData();
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedCourse) {
      setSemester(selectedCourse.semester);
      setTitle(selectedCourse.title);
      setDescription(selectedCourse.description);
      setVideoUrl(selectedCourse.videoUrl);
      setAttachmentUrl(selectedCourse.attachmentUrl);
    }
  }, [selectedCourse]);
  const fetchCoursesData = async () => {
    try {
      const coursesData = await courseServiceInstance.fetchCourses(); 
      setCourses(coursesData);
    } catch (error) {
      setErrorMessage("Failed to retrieve data.");

      console.error("Error fetching courses:", error);
    }
  };

  const handleEdit = (course) => {
    setSemester(course.semester);
    setTitle(course.title);
    setDescription(course.description);
    setVideoUrl(course.videoUrl);
    setAttachmentUrl(course.attachmentUrl);
  };

  const handleUpdate = async (courseId) => {
    try {
      const courseData = {
        semester,
        title,
        description,
        videoUrl,
        attachmentUrl,
      };
      await courseServiceInstance.editCourse(courseId, courseData);
      setSuccessMessage("Course updated successfully");
      fetchCoursesData(); 
    } catch (error) {
      setErrorMessage("Failed to update course.");
      console.error("Error updating course:", error);
    }
  };
  const handleDelete = (courseId) => {
    setCourseToDelete(courseId);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await courseServiceInstance.deleteCourse(courseToDelete);
      setSuccessMessage("Course deleted successfully");
      fetchCoursesData(); 
    } catch (error) {
      setErrorMessage("Failed to delete course.");
      console.error("Error deleting course:", error);
    } finally {
      setDeleteConfirmationOpen(false);
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
        <Header title={""} sections={sections}></Header>
        <br />
        <main style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Course Management</h2>
            <Button color="primary" variant="contained" href="/courses/create">
              Create Course
            </Button>
          </div>
          <List>
            {courses.map((course) => (
              <Accordion key={course.courseId} style={{ marginBottom: "8px" }}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <ListItemText
                    primary={course.title}
                    secondary={`ID: ${course.courseId} | Semester: ${course.semester}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(course)}
                    >
                    <EditIcon style={{ color: "#2196f3" }} />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(course.courseId)}
                    >
                    <DeleteIcon style={{ color: "#f44336" }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <TextField
                      label="Semester"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      required
                    />
                    <TextField
                      label="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <TextField
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    <TextField
                      label="Video URL"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                    <TextField
                      label="Attachment URL"
                      value={attachmentUrl}
                      onChange={(e) => setAttachmentUrl(e.target.value)}
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleUpdate(course.courseId)}
                      style={{ marginTop: "8px" }}
                      disabled={!semester || !title || !description}
                    >
                      Update
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </List>
          <br></br>
          <br></br>
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
        <Dialog
          open={deleteConfirmationOpen}
          onClose={() => setDeleteConfirmationOpen(false)}
        >
          <DialogTitle>WARNING</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this course?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};
export default ManageCourses;
