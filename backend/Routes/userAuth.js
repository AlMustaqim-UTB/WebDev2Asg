const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");


//cookie config used for login/register JWT cookie
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

// Creates a JWT with basic user identity and stores it in cookie "token"
function setAuthCookie(res, user) {
  const payload = {
    user: { id: user.id, role: user.role, name: user.name },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, cookieOptions);
}

// Register
// 1) Validate body fields
// 2) Check duplicate email
// 3) Hash password
// 4) Save user
// 5) Set auth cookie and return safe user fields
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    check("department", "Department is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const first = errors.array()[0]?.msg || "Validation failed";
      return res.status(400).json({ msg: first, errors: errors.array() });
    }

    const { name, email, password, role, department } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      user = new User({ name, email, password, role, department });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      setAuthCookie(res, user);

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// Login
// 1) Validate email/password
// 2) Find user
// 3) Compare hashed password
// 4) Set auth cookie and return safe user fields
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const first = errors.array()[0]?.msg || "Validation failed";
      return res.status(400).json({ msg: first, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      setAuthCookie(res, user);

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// Logout
// Clears the auth cookie so next protected request is unauthorized.
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
  return res.json({ msg: "Logged out" });
});

// Protected route. auth middleware verifies token cookie and sets req.user.
// Returns full user profile except password.
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Technicians
// Protected + role check. Only technician can fetch technician list.
router.get("/technicians", auth, async (req, res) => {
  try {
    if (req.user.role !== "technician") {
      return res.status(403).json({ msg: "Access denied" });
    }
    const technicians = await User.find({ role: "technician" }).select("-password");
    return res.json(technicians);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;