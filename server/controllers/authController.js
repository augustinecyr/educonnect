const mysql = require("mysql");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Login a user
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("email:",email);
  console.log("password:",password);
  console.log("body:", req.body);
  const query = "SELECT * FROM users WHERE email = ?";

  // Execute the query using the connection pool
  pool.query(query, [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    // Compare passwords directly
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Passwords match, return success message
    res
      .status(200)
      .json({ message: "Login successful", userType: user.usertype });
  });
};
