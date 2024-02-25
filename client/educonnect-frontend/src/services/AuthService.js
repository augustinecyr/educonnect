class AuthService {

  login(email, password) {
    const LOGIN_API_AUTH_URL = "http://localhost:3001/api/auth/login";
    return fetch(LOGIN_API_AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        console.log("email:" , email);
        console.log("password:" , password);
        console.log("Received response from server:", response);
        
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful. Received data:", data);
        // Store authentication token in local storage
        localStorage.setItem("token", data.token);
        return data;
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
        throw error; // Rethrow the error to be handled by the caller
      });
  }

  logout() {
    // Clear authentication token from local storage
    localStorage.removeItem("token");
  }

  isAuthenticated() {
    // Check if authentication token exists in local storage
    return localStorage.getItem("token") !== null;
  }
}
const authServiceInstance = new AuthService(); // Create an instance of AuthService

export default authServiceInstance; // Export the instance as the default module

