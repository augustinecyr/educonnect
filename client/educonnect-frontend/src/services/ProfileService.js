import axios from "axios";

const API_URL = "http://localhost:3001/api/users";

class ProfileService {
  async fetchProfile(email) {
    try {
      const response = await axios.get(`${API_URL}/fetch/userinfo/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }

  async editProfile(email, updatedUserInfo) {
    try {
      const response = await axios.put(`${API_URL}/edit/userinfo/${email}`, updatedUserInfo);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }
}

const profileSvcInstance = new ProfileService();
export default profileSvcInstance;
