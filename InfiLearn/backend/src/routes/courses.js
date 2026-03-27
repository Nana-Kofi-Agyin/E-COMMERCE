const express = require("express");
const { pool } = require("../config/db");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();
const writeGuard = [requireAuth, requireRole(["admin", "instructor"])];

router.get("/", async (req, res, next) => {
  try {
    const sql = `
      SELECT
        c.id,
        c.title,
        c.description,
        c.is_published,
        c.created_at,
        c.updated_at,
        c.instructor_id,
        u.full_name AS instructor_name
      FROM courses c
      JOIN users u ON u.id = c.instructor_id
      ORDER BY c.created_at DESC
    `;

    const result = await pool.query(sql);

    return res.json({
      success: true,
      courses: result.rows
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/:courseId", async (req, res, next) => {
  const { courseId } = req.params;

  try {
    const sql = `
      SELECT
        c.id,
        c.title,
        c.description,
        c.is_published,
        c.created_at,
        c.updated_at,
        c.instructor_id,
        u.full_name AS instructor_name
      FROM courses c
      JOIN users u ON u.id = c.instructor_id
      WHERE c.id = $1
      LIMIT 1
    `;

    const result = await pool.query(sql, [courseId]);

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    return res.json({
      success: true,
      course: result.rows[0]
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/", ...writeGuard, async (req, res, next) => {
  const { title, description = null, isPublished = false } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "title is required"
    });
  }

  try {
    const sql = `
      INSERT INTO courses (instructor_id, title, description, is_published)
      VALUES ($1, $2, $3, $4)
      RETURNING id, instructor_id, title, description, is_published, created_at, updated_at
    `;

    const result = await pool.query(sql, [req.user.id, title, description, Boolean(isPublished)]);

    return res.status(201).json({
      success: true,
      course: result.rows[0]
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/:courseId/modules", async (req, res, next) => {
  const { courseId } = req.params;

  try {
    const sql = `
      SELECT id, course_id, title, module_order, created_at, updated_at
      FROM modules
      WHERE course_id = $1
      ORDER BY module_order ASC, id ASC
    `;

    const result = await pool.query(sql, [courseId]);

    return res.json({
      success: true,
      modules: result.rows
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/:courseId/modules", ...writeGuard, async (req, res, next) => {
  const { courseId } = req.params;
  const { title, moduleOrder = 1 } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "title is required"
    });
  }

  try {
    const checkCourse = await pool.query("SELECT id FROM courses WHERE id = $1 LIMIT 1", [courseId]);

    if (!checkCourse.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    const sql = `
      INSERT INTO modules (course_id, title, module_order)
      VALUES ($1, $2, $3)
      RETURNING id, course_id, title, module_order, created_at, updated_at
    `;

    const result = await pool.query(sql, [courseId, title, Number(moduleOrder) || 1]);

    return res.status(201).json({
      success: true,
      module: result.rows[0]
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
