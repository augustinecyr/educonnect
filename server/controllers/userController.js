const User = require("../models/user"); // Assuming you have a User model defined

// Controller function to create a new user
exports.createUser = (req, res) => {
  const { name, company, occupation, mobile_number, email, password, createdAt, updatedAt } =
    req.body;
  
  const userData = {
    name,
    company,
    occupation,
    mobile_number,
    email,
    password,
    createdAt,
    updatedAt,
  };

  // Call the createUser function on the User model
  User.create(userData, (error, result) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res
      .status(201)
      .json({ message: "User created successfully", user: result });
      
  });
};
