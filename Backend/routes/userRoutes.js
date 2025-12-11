const express = require("express");
const User = require("../Database/models/user");
const jwt = require("jsonwebtoken"); 

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

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch(error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      details: error.toString()
  });
  }
})

module.exports = router; 