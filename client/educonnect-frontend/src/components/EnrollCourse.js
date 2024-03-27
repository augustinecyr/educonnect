import React from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CssBaseline,
  Tabs,
  Tab,
  Box,
  Button,
} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import theme from "../themes/Theme";
import courseServiceInstance from "../services/CourseService";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "#" },
  { title: "Resources", url: "#" },
  { title: "Profile", url: "#" },
];

const EnrollCourse = () => {
  const location = useLocation();
  const { state } = location;
  const courseId = state ? state.courseId : null;
  const [course, setCourse] = useState();
  const [tabValue, setTabValue] = useState(0);
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");

  useEffect(() => {
    if (courseId) {
      fetchCourseData(courseId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const courseData = await courseServiceInstance.fetchCourseById(courseId);
      setCourse(courseData);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const extractVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/(?:watch\?v=)?([^\s&]+)/
    );
    return match ? match[1] : null;
  };

  const handleDownloadPdf = () => {
    if (course.attachmentUrl) {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([course.attachmentUrl]));
      reader.onload = () => {
        setAttachmentUrl(reader.result);
        setAttachmentName(reader.result);
        console.log(attachmentUrl);
      };
      const blob = b64toBlob(course.attachmentUrl);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", attachmentName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const b64toBlob = (bufferData) => {
    const byteArray = new Uint8Array(bufferData.data);
    return new Blob([byteArray], { type: "application/pdf" });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title={""} sections={sections} />
      <Container maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={tabValue} onChange={handleChangeTab}>
            <Tab label="Overview" />
            <Tab label="Videos" />
            <Tab label="Resources" />
          </Tabs>
        </Box>
        {tabValue === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {course?.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Course ID: {course?.courseId}
                  </Typography>
                  <Typography variant="body1">
                    Description: {course?.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        {tabValue === 1 && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                  ></Typography>
                  {course?.videoUrl && (
                    <div>
                      {course.videoUrl.split(",").map((url, index) => (
                        <div key={index} style={{ marginBottom: "20px" }}>
                          <iframe
                            width="100%"
                            height="600"
                            src={`https://www.youtube.com/embed/${extractVideoId(
                              url
                            )}`}
                            title={`Video ${index + 1}`}
                            allowFullScreen
                          ></iframe>
                        </div>
                      ))}
                    </div>
                  )}{" "}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        {tabValue === 2 && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    Resources
                  </Typography>
                  {course && course.attachmentUrl && (
                    <div>
                      <Typography variant="body1">
                        Filename: {attachmentName || "No file selected"}
                      </Typography>
                      <Button onClick={handleDownloadPdf}>Download PDF</Button>
                      {/* You can also display the PDF content here if needed */}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default EnrollCourse;
