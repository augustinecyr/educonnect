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

const sections = [
  { title: "Courses", url: "#" },
  { title: "Analytics", url: "#" },
  { title: "Resources", url: "#" },
  { title: "Feature x", url: "#" },
  { title: "Feature x", url: "#" },
  { title: "Feature x", url: "#" },
  { title: "Profile", url: "#" },
];

const mainFeaturedPost = {
  title: "Welcome to EduConnect",
  description:
    "Education transcends the traditional classroom. Embrace a future of limitless learning opportunities and embark on a journey towards realizing your full potential.",
  image: "https://source.unsplash.com/random?wallpapers",
  linkText: "Start Learning",
};

const featuredPosts = [
  {
    title: "Article 1",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
  },
  {
    title: "Article 2",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
  },
];

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={""} sections={sections} />{" "}
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
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
