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
import remotework from "../images/remote-work.jpg";
import technologyineducation from "../images/technology-in-education.jpg";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "/analytics" },
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
    article: `As artificial intelligence (AI) continues to permeate various aspects of our lives, the need for AI education becomes increasingly critical. AI education not only equips students with the necessary technical skills to navigate the evolving job market but also fosters a deeper understanding of the ethical and societal implications of AI technology.

    In today's digital age, AI has become ubiquitous, powering everything from recommendation systems to autonomous vehicles. Therefore, providing students with a solid foundation in AI principles and algorithms is essential for preparing them for future careers in fields such as data science, robotics, and machine learning.
    
    Moreover, AI education encourages innovation and creativity by empowering students to harness the potential of AI technology to solve complex problems and drive positive change in society. By incorporating AI education into curricula at all levels of education, we can ensure that the next generation is equipped to leverage AI for the greater good.
    `,
    image: ai,
    imageLabel: "Artificial Intelligence Education",
  },
  {
    title: "Tips for Effective Online Learning",
    date: "March 7 2024",
    description:
      "Discover practical tips and strategies for making the most out of online learning experiences.",
    article: `With the rapid expansion of online learning opportunities, mastering the art of effective online learning has never been more important. Whether you're a student pursuing a degree or a professional looking to upskill, implementing the right strategies can make all the difference in maximizing your online learning experience.

    First and foremost, establish a dedicated learning space free from distractions to create a conducive environment for focused study. Set specific goals and create a schedule to stay organized and motivated throughout your online learning journey.
    
    Additionally, actively engage with course materials by participating in discussions, completing assignments on time, and seeking clarification when needed. Take advantage of technology tools such as video lectures, interactive quizzes, and online forums to enhance your understanding and retention of course content.
    
    Finally, don't forget to prioritize self-care and maintain a healthy work-life balance. Take regular breaks, stay physically active, and connect with peers to combat feelings of isolation and burnout commonly associated with online learning.
    `,
    image: onlinelearning,
    imageLabel: "Online Learning",
  },
  {
    title: "The Future of Remote Work",
    date: "March 10, 2024",
    description:
      "Explore the potential of remote work in reshaping traditional office environments and fostering work-life balance.",
    article: `Remote work, once considered a fringe concept, has now become a mainstream phenomenon reshaping the traditional landscape of office environments. With advancements in technology and changing attitudes towards work-life balance, the future of remote work holds immense potential for transforming the way we work.

    Remote work offers unprecedented flexibility, allowing individuals to design their workdays around personal commitments and preferences. This flexibility not only promotes employee satisfaction but also enables companies to attract top talent from diverse geographical locations.
    
    Furthermore, remote work fosters innovation and productivity by breaking down geographical barriers and encouraging collaboration among distributed teams. With the rise of digital nomadism and remote-first companies, the concept of the office as a physical space is evolving, giving rise to new models of work and collaboration.
    
    As we embrace the future of remote work, it's essential to address challenges such as digital inclusion, cybersecurity, and maintaining company culture in a virtual environment. By leveraging technology and adopting flexible work policies, we can create a future where remote work is not just a trend but a sustainable and inclusive way of working.
    `,
    image: remotework,
    imageLabel: "Remote Work",
  },
  {
    title: "Technology in Education",
    date: "March 11, 2024",
    description:
      "Explore how technology is transforming the landscape of education, from interactive learning platforms to virtual classrooms, and its impact on student engagement and outcomes.",
    article: `
    In today's rapidly evolving world, technology plays a pivotal role in reshaping the field of education. Gone are the days of traditional teaching methods confined to the walls of a classroom. With the advent of digital tools and interactive platforms, learning has become more accessible, engaging, and personalized than ever before.

    One of the key aspects of technology in modern education is its ability to break down geographical barriers. Through online courses and virtual classrooms, students can now access quality education from anywhere in the world. This not only opens up opportunities for remote learning but also fosters a sense of global connectivity and collaboration among students.

    Interactive learning platforms have revolutionized the way students engage with course materials. From gamified lessons to multimedia resources, these platforms cater to diverse learning styles, making education more inclusive and effective. Students can now learn at their own pace, delve deeper into topics of interest, and receive instant feedback, thereby enhancing their overall learning experience.

    Furthermore, technology enables educators to tailor instruction to individual student needs through data-driven insights. By analyzing student performance and behavior, teachers can identify areas for improvement and provide targeted support, ultimately leading to better academic outcomes.

    However, with these advancements also come challenges and considerations. As technology continues to evolve, it's crucial to ensure equitable access to digital resources and address issues of digital literacy and online safety. Additionally, striking a balance between technology and traditional teaching methods is essential to maintain the human connection and social interaction integral to the learning process.

    In conclusion, the role of technology in modern education is undeniable. By leveraging digital tools and innovative approaches, we can create a more inclusive, engaging, and effective learning environment that prepares students for success in the digital age.
  `,
    image: technologyineducation,
    imageLabel: "Technology in Education",
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
        <Header title={""} sections={sections} />
        <Container maxWidth="lg">

        <br/>
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
      <br/><br/>
      <Footer />
    </ThemeProvider>
  );
}
