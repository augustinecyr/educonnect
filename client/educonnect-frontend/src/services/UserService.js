class UserService {
  async registerUser(
    name,
    company,
    occupation,
    mobile_number,
    email,
    password
  ) {
    const REGISTER_USER_API_URL = "http://localhost:3001/api/users/register";
    try {
      const response = await fetch(REGISTER_USER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          occupation,
          mobile_number,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("User registration failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("An error occurred during user registration:", error);
      throw error;
    }
  }

  async forgotPassword(email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

const userServiceInstance = new UserService(); 

export default userServiceInstance; 
