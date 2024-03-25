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
} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import theme from "../themes/Theme";
import courseServiceInstance from "../services/CourseService";
import { ThemeProvider } from "@mui/material/styles";

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
  const [course, setCourse] = React.useState();
  const [tabValue, setTabValue] = React.useState(0);

  React.useEffect(() => {
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
                  <Typography gutterBottom variant="h4" component="div">
                    Videos
                  </Typography>
                  {course?.videoUrl && (
                    <div>
                      {course.videoUrl.split(",").map((url, index) => (
                        <div key={index} style={{ marginBottom: "20px" }}>
                          <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${extractVideoId(
                              url
                            )}`}
                            title={`Video ${index + 1}`}
                            frameBorder="0"
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
                  {course?.attachmentUrl && (
                    <a
                      href={course?.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Resources
                    </a>
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
