import axios from "axios";

const API_URL = "http://localhost:3001/api/courses";

class CourseService {
  async fetchCourses() {
    try {
      const response = await axios.get(`${API_URL}/fetch`);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }

  async createCourse(courseData) {
    try {
      const response = await axios.post(`${API_URL}/create`, courseData);
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  }

  async editCourse(courseId, courseData) {
    try {
      const response = await axios.put(
        `${API_URL}/edit/${courseId}`,
        courseData
      );
      return response.data;
    } catch (error) {
      console.error("Error editing course:", error);
      throw error;
    }
  }

  async deleteCourse(courseId) {
    try {
      const response = await axios.delete(`${API_URL}/delete/${courseId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  }
}

const courseServiceInstance = new CourseService();
export default courseServiceInstance;