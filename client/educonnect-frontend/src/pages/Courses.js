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
import { useState } from "react";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "#" },
  { title: "Resources", url: "#" },
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
  const [currentCourses, setCurrentCourses] = useState([]);

  console.log(currentCourses);
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={""} sections={sections} />
        <main>
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
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {course.title}
                        </Typography>
                        <br />
                        {isAdmin ? (
                          <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleManageClick(course)}
                        >
                          Manage
                        </Button>                        
                        ) : (
                          <Button variant="contained" color="primary">
                            Enroll Now
                          </Button>
                        )}
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
