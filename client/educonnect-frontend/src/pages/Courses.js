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

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "#" },
  { title: "Resources", url: "#" },
  { title: "Profile", url: "#" },
];

const coursesContent = [
  {
    title: "Course 1",
    description: "Description of Course 1",
    image: "https://via.placeholder.com/150", // Example image URL
    rating: 4.5, // Example rating
    enrolled: 1234, // Example number of students enrolled
    hours: 20, // Example total hours
  },
  {
    title: "Course 2",
    description: "Description of Course 2",
    image: "https://via.placeholder.com/150", // Example image URL
    rating: 4.0, // Example rating
    enrolled: 5678, // Example number of students enrolled
    hours: 30, // Example total hours
  },
  {
    title: "Course 3",
    description: "Description of Course 3",
    image: "https://via.placeholder.com/150", // Example image URL
    rating: 3.8, // Example rating
    enrolled: 9012, // Example number of students enrolled
    hours: 25, // Example total hours
  },
  // Add more courses as needed
];

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={""} sections={sections} />
        <br />
        <main>
          <Grid container spacing={4}>
            {coursesContent.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Tooltip
                  title={
                    <>
                      <Typography variant="body1">{course.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Description: {course.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Total Hours: {course.hours}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Rating: {course.rating}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
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
                      <Button variant="contained" color="primary">
                        Enroll Now
                      </Button>
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
