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
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";
import courseServiceInstance from "../services/CourseService";

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
  console.log("User has a valid token:", isAuthenticated);
  console.log("User is an Admin", isAdmin);

  useEffect(() => {
    setIsAdmin(authServiceInstance.isAdmin("admin@educonnect.sg"));
    fetchCoursesData(); // Fetch courses when component mounts
  }, [isAuthenticated]);

  const fetchCoursesData = async () => {
    try {
      const coursesData = await courseServiceInstance.fetchCourses(); // Call the method from the instance
      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/courses/create",
        {
          semester,
          title,
          description,
          videoUrl,
          attachmentUrl,
        }
      );
      console.log("Response:", response.data);
      // Clear the form after successful submission
      setSemester("");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setAttachmentUrl("");
      // Refresh the course list
      courseServiceInstance.fetchCourses();
      // You can also show a success message or redirect the user
    } catch (error) {
      console.error("Error:", error);
      // Handle error (show error message, etc.)
    }
  };

  const handleEdit = (course) => {
    // Populate form fields with course details for editing
    setSemester(course.semester);
    setTitle(course.title);
    setDescription(course.description);
    setVideoUrl(course.videoUrl);
    setAttachmentUrl(course.attachmentUrl);
  };

  const handleDelete = async (courseId) => {
    try {
      // Make a DELETE request to your backend API to delete the course
      const response = await axios.delete(
        `YOUR_BACKEND_API_URL_HERE/${courseId}`
      );
      console.log("Response:", response.data);
      // Refresh the course list
      courseServiceInstance.fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={""} sections={sections}>
         
        </Header>

        <br />
        <main style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Courses</h2>
            <Button color="primary" variant="contained" href="/courses/create">
              Create Course
            </Button>
          </div>
          <form onSubmit={handleSubmit}>{/* Form fields here */}</form>
          <List>
            {courses.map((course) => (
              <ListItem key={course.courseId} divider>
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
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(course.courseId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default ManageCourses;