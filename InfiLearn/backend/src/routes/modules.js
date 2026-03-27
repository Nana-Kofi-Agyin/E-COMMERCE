const express = require("express");
const { pool } = require("../config/db");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();
const writeGuard = [requireAuth, requireRole(["admin", "instructor"])];

router.get("/:moduleId/lessons", async (req, res, next) => {
  const { moduleId } = req.params;

  try {
    const sql = `
      SELECT id, module_id, title, content, lesson_order, created_at, updated_at
      FROM lessons
      WHERE module_id = $1
      ORDER BY lesson_order ASC, id ASC
    `;

    const result = await pool.query(sql, [moduleId]);

    return res.json({
      success: true,
      lessons: result.rows
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/:moduleId/lessons", ...writeGuard, async (req, res, next) => {
  const { moduleId } = req.params;
  const { title, content = null, lessonOrder = 1 } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "title is required"
    });
  }

  try {
    const checkModule = await pool.query("SELECT id FROM modules WHERE id = $1 LIMIT 1", [moduleId]);

    if (!checkModule.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Module not found"
      });
    }

    const sql = `
      INSERT INTO lessons (module_id, title, content, lesson_order)
      VALUES ($1, $2, $3, $4)
      RETURNING id, module_id, title, content, lesson_order, created_at, updated_at
    `;

    const result = await pool.query(sql, [moduleId, title, content, Number(lessonOrder) || 1]);

    return res.status(201).json({
      success: true,
      lesson: result.rows[0]
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
