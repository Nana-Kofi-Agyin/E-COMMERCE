const express = require("express");
const User = require("../Database/models/user");
const jwt = require("jsonwebtoken"); 
const { protect } = require("../middleware/auth");

const router = express.Router();

//@route POST api/users/register
//@desc Register a new user 
//@access Public
router.post("/register", async (req, res) => {
  console.log("POST /api/users/register body:", req.body); //debug
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({message: "please provide all fields" });
  }

  //registration logic
  try {
    //res.send({name, email, password});
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({message: "User already exists"});

    user = new User({name, email, password});
    await user.save();

    // create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // sign and return token with user data
    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: "40h" }, 
      (err, token) => {
        if (err) throw err;

        //Send the user and token in response
              res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    ); 


  } catch(error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      details: error.toString()
  });
  }
})

//@route POST api/users/login
//@desc Login user
//@access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign and return token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

//@route GET api/users/profile
//@desc Get user profile
//@access Private
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; 