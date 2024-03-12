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
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import authServiceInstance from "../services/AuthService"; 

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "#" },
  { title: "Resources", url: "#" },
  { title: "Profile", url: "#" },
];

// Define courses for each semester
const semesterCourses = {
  T12024: [
    {
      title: "Course 1",
      description: "Description of Course 1",
      image: "https://via.placeholder.com/150", // Example image URL
      rating: 4.5, // Example rating
      enrolled: 1234, // Example number of students enrolled
      hours: 20, // Example total hours
    },
  ],
  T22024: [
    {
      title: "Course 4",
      description: "Description of Course 4",
      image: "https://via.placeholder.com/150", // Example image URL
      rating: 4.2, // Example rating
      enrolled: 3456, // Example number of students enrolled
      hours: 25, // Example total hours
    },
  ],
  T32024: [
    {
      title: "Course 7",
      description: "Description of Course 7",
      image: "https://via.placeholder.com/150", // Example image URL
      rating: 4.0, // Example rating
      enrolled: 6789, // Example number of students enrolled
      hours: 30, // Example total hours
    },
  ],
};

export default function Home() {
  const isAuthenticated = authServiceInstance.isAuthenticated();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    setIsAdmin(authServiceInstance.isAdmin("admin@educonnect.sg"));
  }, [isAuthenticated]);

  const [semester, setSemester] = React.useState("T12024");
  const [currentCourses, setCurrentCourses] = React.useState(
    semesterCourses["T12024"]
  );

  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;
    setSemester(selectedSemester);
    setCurrentCourses(semesterCourses[selectedSemester]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={""} sections={sections} />
        <br />
        <main>
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <Select
              labelId="semester-label"
              id="semester-select"
              value={semester}
              onChange={handleSemesterChange}
            >
              <MenuItem value="T12024">T12024</MenuItem>
              <MenuItem value="T22024">T22024</MenuItem>
              <MenuItem value="T32024">T32024</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={4}>
            {currentCourses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Tooltip
                  title={
                    <>
                      <Typography variant="body1">{course.title}</Typography>
                      <Typography variant="body1" color="white">
                        Description: {course.description}
                      </Typography>
                      <Typography variant="body2" color="white">
                        Total Hours: {course.hours}
                      </Typography>
                      <Typography variant="body2" color="white">
                        Rating: {course.rating}
                      </Typography>
                      <Typography variant="body2" color="white">
                        Students Enrolled: {course.enrolled}
                      </Typography>
                    </>
                  }
                  placement="right"
                >
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={course.image}
                      alt={course.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rating: {course.rating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Students Enrolled: {course.enrolled}
                      </Typography>
                      <br />
                      {isAdmin ? (
                        <Button variant="contained" color="secondary">
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
