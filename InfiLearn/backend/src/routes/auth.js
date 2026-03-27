const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");
const env = require("../config/env");

const router = express.Router();
const ALLOWED_ROLES = new Set(["admin", "instructor", "student"]);

router.post("/register", async (req, res, next) => {
  const { fullName, email, password, role = "student" } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "fullName, email, and password are required"
    });
  }

  if (!ALLOWED_ROLES.has(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role"
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const insertSql = `
      INSERT INTO users (full_name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, full_name, email, role, created_at
    `;

    const result = await pool.query(insertSql, [fullName, email.toLowerCase(), passwordHash, role]);

    return res.status(201).json({
      success: true,
      user: result.rows[0]
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password are required"
    });
  }

  try {
    const userSql = `
      SELECT id, email, role, password_hash
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

    const result = await pool.query(userSql, [email.toLowerCase()]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role
      },
      env.jwtSecret,
      {
        subject: String(user.id),
        expiresIn: env.jwtExpiresIn
      }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
