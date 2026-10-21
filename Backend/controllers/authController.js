const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// ===============================
// REGISTER
// ===============================

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      experienceMode,
    } = req.body;


    // Check required fields

    if (
      !name ||
      !email ||
      !password ||
      !age
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }


    // Check existing user

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }


    // Validate password

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must contain at least 6 characters.",
      });
    }


    // Hash password

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // Create user

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      age,
      experienceMode:
        experienceMode === "classic"
          ? "classic"
          : "dynamic",
    });


    // Create JWT

    const token = jwt.sign(
      {
        userId: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );


    // Response

    res.status(201).json({
      message: "Account created successfully.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        experienceMode: user.experienceMode,
      },
    });


  } catch (error) {

    console.error(
      "Registration error:",
      error.message
    );

    res.status(500).json({
      message: "Server error during registration.",
    });
  }
};



// ===============================
// LOGIN
// ===============================

const loginUser = async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required.",
      });
    }


    // Find user

    const user = await User.findOne({
      email: email.toLowerCase(),
    });


    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password.",
      });
    }


    // Compare password

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password.",
      });
    }


    // Create JWT

    const token = jwt.sign(
      {
        userId: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );


    // Send response

    res.json({

      message: "Login successful.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        experienceMode:
          user.experienceMode,
      },

    });


  } catch (error) {

    console.error(
      "Login error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error during login.",
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
