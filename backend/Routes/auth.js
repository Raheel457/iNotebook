require("dotenv").config();
const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Route: 1 Creating new user at /createuser
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // Return bad request on error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation error");
      return res.status(400).json({ status: success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      // Checking if email already exists
      if (user) {
        return res.status(400).json({ status: success,errors: "Email Already exists" });
      }
      // Securing password using bcrypt
      // i. Creating salt
      const salt = await bcrypt.genSalt(10);
      // ii. Hashing password as well as salting
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Creating new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // Creating JWT token using data's id
      const data = {
        user: {
          id: user.id,
        },
      };
      // Signing token
      success = true;
      const jwtData = jwt.sign(data, JWT_SECRET,{expiresIn:"605s"});
      res.json({ status: success, jwtData });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Some error Happened");
    }
  }
);

// Route: 2 Login user who already exit at /login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation error");
      return res.status(400).json({ status: success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // Checking if email exists in db
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ status: success });
      }
      const passCompare = await bcrypt.compare(password, user.password);

      // Checking if password matches in db
      if (!passCompare) {
        return res.status(400).json({ status: success });
      }
      // Creating JWT token using data's id
      const data = {
        user: {
          id: user.id,
        },
      };
      // Signing token
      success = true;
      const jwtData = jwt.sign(data, JWT_SECRET,{expiresIn:"605s"});
      res.json({ status: success, jwtData });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Some error Happened");
    }
  }
);
// Route: 3 Give user details after login /getuser
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user;
    const user = await User.findOne({ _id: userId.id }).select("-password");
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Some error Happened");
  }
});

module.exports = router;
