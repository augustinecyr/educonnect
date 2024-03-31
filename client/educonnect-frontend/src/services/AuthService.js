class AuthService {
  async login(email, password) {
    const LOGIN_API_AUTH_URL = "http://localhost:3001/api/auth/login";
    try {
      const response = await fetch(LOGIN_API_AUTH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();

      localStorage.setItem("email", email);
      localStorage.setItem("token", data.token);
      console.log(data.token);
      return data;
    } catch (error) {
      console.error("An error occurred during login:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }

  isAuthenticated() {
    return localStorage.getItem("token") !== null;
  }

  isAdmin(email) {
    email = localStorage.getItem("email");
    return email === "admin@educonnect.sg";
  }
}
const authServiceInstance = new AuthService();
export default authServiceInstance;
