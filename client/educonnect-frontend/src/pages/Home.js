import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import MainFeaturedPost from "../components/MainFeaturedPost";
import FeaturedPost from "../components/FeaturedPost";
import Footer from "../components/Footer";
import theme from "../themes/Theme";
import "../index.css";
import ai from "../images/ai.jpg";
import onlinelearning from "../images/online-learning.jpg";
import authServiceInstance from "../services/AuthService";


const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "#" },
  { title: "Resources", url: "#" },
  { title: "Profile", url: "#" },
];

const mainFeaturedPost = {
  title: "Welcome to EduConnect",
  description:
    "Education transcends the traditional classroom. Embrace a future of limitless learning opportunities and embark on a journey towards realizing your full potential.",
};

const featuredPosts = [
  {
    title: "The Importance of AI Education",
    date: "March 8, 2024",
    description:
      "Discover the significance of AI education in preparing students for the evolving job market and driving innovation.",
    image: ai,
    imageLabel: "Artificial Intelligence Education",
  },
  {
    title: "Tips for Effective Online Learning",
    date: "March 7 2024",
    description:
      "Discover practical tips and strategies for making the most out of online learning experiences.",
    image: onlinelearning,
    imageLabel: "Online Learning",
  },
];

export default function Home() {
  
const isAdmin = authServiceInstance.isAdmin("admin@educonnect.sg");

const isAuthenticated = authServiceInstance.isAuthenticated();
console.log("User has a valid token:", isAuthenticated);
console.log("User is an Admin", isAdmin);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={""} sections={sections} /> <br></br>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4} sx={{ marginTop: 2 }}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
