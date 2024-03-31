import axios from "axios";

const API_URL = "http://localhost:3001/api/analytics";

class AnalyticsService {
  async getTotalCourses() {
    try {
      const response = await axios.get(`${API_URL}/fetch/courses/count`);
      return response.data;
    } catch (error) {
      console.error("Error fetching total count for courses:", error);
      throw error;
    }
  }

  async getTotalEnrolledUsers() {
    try {
      const response = await axios.get(`${API_URL}/fetch/users/count`);
      return response.data;
    } catch (error) {
      console.error("Error fetching total count for users:", error);
      throw error;
    }
  }

  async getEnrolledCoursesByEmail(email) {
    try {
      const response = await axios.get(`${API_URL}/fetch/enrolled/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching total courses by email:", error);
      throw error;
    }
  }
  
}

const analyticsServiceInstance = new AnalyticsService();
export default analyticsServiceInstance;
