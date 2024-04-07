import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import theme from "../themes/Theme";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import authServiceInstance from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import courseServiceInstance from "../services/CourseService";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import coursebanner1 from "../images/coursebanner1.jpg";
import coursebanner2 from "../images/coursebanner2.jpg";
import coursebanner3 from "../images/coursebanner3.jpg";
import coursebanner4 from "../images/coursebanner4.jpg";
import "../index.css";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "/analytics" },
  { title: "Profile", url: "#" },
];

const semesterCourses = {};

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = authServiceInstance.isAuthenticated();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = useState([]);
  const [semester, setSemester] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [currentCourses, setCurrentCourses] = useState([]);
  const [carouselImages, setCarouselImages] = useState([
    {
      image: coursebanner1,
      title: "Take Breaks",
      description:
        "Remember to take short breaks during study sessions to stay refreshed and focused.",
    },
    {
      image: coursebanner2,
      title: "Stay Organized",
      description:
        "Use digital tools or apps to organize your study materials and schedule efficiently.",
    },
    {
      image: coursebanner3,
      title: "Active Learning",
      description:
        "Engage in active learning techniques like summarizing, teaching others, or self-quizzing to enhance understanding.",
    },
    {
      image: coursebanner4,
      title: "Limit Distractions",
      description:
        "Minimize distractions by setting up a dedicated study space and turning off notifications on your devices.",
    },
  ]);

  useEffect(() => {
    if (isAdmin) {
      setCarouselImages([]);
    }
  }, [isAdmin]);

  React.useEffect(() => {
    setIsAdmin(authServiceInstance.isAdmin("admin@educonnect.sg"));
    setLoading(false);
    fetchCoursesData();
  }, [isAuthenticated]);

  const fetchCoursesData = async () => {
    try {
      const coursesData = await courseServiceInstance.fetchCourses();
      setCourses(coursesData);
      if (coursesData.length > 0) {
        const firstSemester = coursesData[0].semester;
        setSemester(firstSemester);
        setCurrentCourses(semesterCourses[firstSemester]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;
    setSemester(selectedSemester);
    setCurrentCourses(semesterCourses[selectedSemester]);
  };

  if (loading) {
    return null;
  }

  const handleManageClick = (course) => {
    navigate(`/courses/manage`, { state: { course } });
  };
  const handleFindOutMoreClick = (course) => {
    navigate(`/courses/enroll/${course.courseId}`, {
      state: { courseId: course.courseId },
    });
  };

  const handlePreviewClick = (course) => {
    navigate(`/courses/preview/${course.courseId}`, {
      state: { courseId: course.courseId },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title={""} sections={sections} />
      <Container maxWidth="lg">
        <main>
          {!isAdmin && (
            <Carousel
              autoPlay={true}
              interval={5000}
              infiniteLoop={true}
              showThumbs={false}
            >
              {carouselImages.map((item, index) => (
                <div key={index} className="carousel-item">
                  <img src={item.image} alt={`Carousel ${index + 1}`} />
                  <div className="carousel-typography">
                    <Typography variant="h6" style={{ textAlign: "left" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" style={{ textAlign: "left" }}>
                      {item.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <Select
              labelId="semester-label"
              id="semester-select"
              value={semester}
              onChange={handleSemesterChange}
            >
              {Array.from(
                new Set(courses.map((course) => course.semester))
              ).map((semesterOption) => (
                <MenuItem key={semesterOption} value={semesterOption}>
                  {semesterOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container spacing={4}>
            {courses
              .filter((course) => course.semester === semester)
              .map((course, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Tooltip
                    title={
                      <>
                        <Typography variant="body1">{course.title}</Typography>
                        <Typography variant="body1" color="white">
                          Description: {course.description}
                        </Typography>
                      </>
                    }
                    placement="right"
                  >
                    <Card className="course-card">
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {course.title}
                        </Typography>
                        <br />
                        <div className="button-container">
                        {isAdmin ? (
                          <div>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleManageClick(course)}
                              sx={{ marginRight: 1 }}
                            >
                              Manage
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handlePreviewClick(course)}
                            >
                              Preview
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleFindOutMoreClick(course)}
                          >
                            Find Out More..
                          </Button>
                        )}
                        </div>
                      </CardContent>
                    </Card>
                  </Tooltip>
                </Grid>
              ))}
          </Grid>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
