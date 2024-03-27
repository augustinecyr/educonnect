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
  MenuItem,
  LinearProgress,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  CloudUpload,
} from "@mui/icons-material";
import courseServiceInstance from "../services/CourseService";
import { useLocation, Link } from "react-router-dom";
import {} from "@mui/icons-material";

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
  const [videoUrls, setVideoUrls] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [courses, setCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const selectedCourse = location.state?.course;
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [semesterFilter, setSemesterFilter] = useState("");
  const semesters = [...new Set(courses.map((course) => course.semester))];
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      setVideoUrls(selectedCourse.videoUrl);
      setAttachmentUrl(selectedCourse.attachmentUrl);
    }
  }, [selectedCourse]);

  useEffect(() => {
    setFilteredCourses(
      semesterFilter
        ? courses.filter((course) => course.semester === semesterFilter)
        : courses
    );
  }, [semesterFilter, courses]);

  const fetchCoursesData = async () => {
    try {
      setIsRefreshing(true);
      await new Promise((resolve) => setTimeout(resolve, 2200));
      const coursesData = await courseServiceInstance.fetchCourses();
      setCourses(coursesData);
      setIsRefreshing(false);
    } catch (error) {
      setErrorMessage("Failed to retrieve data.");
      console.error("Error fetching courses:", error);
      setIsRefreshing(false);
    }
  };
  const handleEdit = (course) => {
    setSemester(course.semester);
    setTitle(course.title);
    setDescription(course.description);
    setVideoUrls(course.videoUrl);
    const reader = new FileReader();
    reader.readAsDataURL(new Blob([course.attachmentUrl]));
    reader.onload = () => {
      setAttachmentUrl(reader.result);
      console.log(attachmentUrl);
    };
  };

  const handleUpdate = async (courseId) => {
    try {
      const courseData = {
        semester,
        title,
        description,
        videoUrls,
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
    if (successMessage) {
      setSuccessMessage("");
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleAddVideoUrl = () => {
    setVideoUrls((prevUrls) => (prevUrls ? `${prevUrls},` : ""));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title={""} sections={sections} />
      <Container maxWidth="lg">
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={fetchCoursesData}
                disabled={isRefreshing}
              >
                <RefreshIcon />
              </Button>
              <Link
                to="/courses/create"
                style={{ textDecoration: "none", marginLeft: "10px" }}
              >
                <Button color="primary" variant="contained">
                  Create Course
                </Button>
              </Link>
            </div>
          </div>

          <TextField
            select
            label="Filter by Semester"
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            variant="outlined"
            style={{ marginBottom: "16px" }}
          >
            <MenuItem value="">All Semesters</MenuItem>
            {semesters.map((semester, index) => (
              <MenuItem key={index} value={semester}>
                {semester}
              </MenuItem>
            ))}
          </TextField>
          {isRefreshing && <LinearProgress style={{ width: "1150px" }} />}

          <List>
            {filteredCourses.map((course) => (
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
                    <Link
                      to={`/courses/edit/${course.courseId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEdit(course)}
                      >
                        <EditIcon style={{ color: "#2196f3" }} />
                      </IconButton>
                    </Link>
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
                      gap: "16px",
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
                      multiline
                      required
                    />
                    {videoUrls.split(",").map((url, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <TextField
                          label={`Video URL ${index + 1}`}
                          value={url}
                          onChange={(e) => {
                            const updatedUrls = videoUrls.split(",");
                            updatedUrls[index] = e.target.value;
                            setVideoUrls(updatedUrls.join(","));
                          }}
                          placeholder={url || "Enter Video URL"}
                          style={{ marginRight: "8px", flex: 1 }}
                        />
                        <ClearIcon
                          style={{ color: "#757575", cursor: "pointer" }}
                          onClick={() => {
                            const updatedUrls = videoUrls.split(",");
                            updatedUrls.splice(index, 1);
                            setVideoUrls(updatedUrls.join(","));
                          }}
                        />
                      </div>
                    ))}
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleAddVideoUrl}
                      style={{ marginTop: "8px" }}
                    >
                      Add Video URL
                    </Button>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        label="Attachment"
                        value={attachmentUrl || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        variant="outlined"
                        style={{ marginBottom: "16px", marginRight: "8px" }}
                      />
                      <label htmlFor="attachment-upload">
                        <Button
                          color="primary"
                          variant="contained"
                          component="span"
                          style={{ marginTop: "8px" }}
                        >
                          <CloudUpload />
                        </Button>
                      </label>
                      <input
                        accept="*"
                        style={{ display: "none" }}
                        id="attachment-upload"
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const fileUrl = URL.createObjectURL(file);
                            setAttachmentUrl(fileUrl);
                            document.getElementById(
                              "attachment-label"
                            ).textContent = file.name;
                          } else {
                            setAttachmentUrl(null);
                            document.getElementById(
                              "attachment-label"
                            ).textContent = "No file selected";
                          }
                        }}
                      />
                      {attachmentUrl && (
                        <div style={{ marginLeft: "8px" }}>
                          <ClearIcon
                            style={{ color: "#757575", cursor: "pointer" }}
                            onClick={() => {
                              setAttachmentUrl(null);
                            }}
                          />
                        </div>
                      )}
                    </div>
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
          autoHideDuration={1500}
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
