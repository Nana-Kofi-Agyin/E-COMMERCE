const express = require("express");
const { pool } = require("../config/db");
const authRoutes = require("./auth");
const courseRoutes = require("./courses");
const moduleRoutes = require("./modules");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "InfiLearn LMS backend is running"
  });
});

router.get("/health", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT NOW() AS server_time");

    res.json({
      success: true,
      status: "ok",
      dbTime: result.rows[0].server_time
    });
  } catch (err) {
    next(err);
  }
});

router.get("/readiness", async (req, res, next) => {
  try {
    const dbTimeResult = await pool.query("SELECT NOW() AS server_time");
    const tableCheckSql = `
      SELECT
        to_regclass('public.users') IS NOT NULL AS users,
        to_regclass('public.courses') IS NOT NULL AS courses,
        to_regclass('public.modules') IS NOT NULL AS modules,
        to_regclass('public.lessons') IS NOT NULL AS lessons,
        to_regclass('public.quizzes') IS NOT NULL AS quizzes,
        to_regclass('public.enrollments') IS NOT NULL AS enrollments
    `;
    const tableResult = await pool.query(tableCheckSql);
    const tables = tableResult.rows[0];
    const missingTables = Object.keys(tables).filter((tableName) => !tables[tableName]);

    res.json({
      success: true,
      status: missingTables.length ? "degraded" : "ready",
      dbTime: dbTimeResult.rows[0].server_time,
      checks: {
        database: true,
        tables,
        missingTables
      }
    });
  } catch (err) {
    next(err);
  }
});

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/modules", moduleRoutes);

module.exports = router;
