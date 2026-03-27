const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../src/app");
const { pool } = require("../src/config/db");

const realQuery = pool.query.bind(pool);

function mockPoolQuery(impl) {
  pool.query = impl;
}

function restorePoolQuery() {
  pool.query = realQuery;
}

test.afterEach(() => {
  restorePoolQuery();
});

test("GET /api returns service status", async () => {
  const response = await request(app).get("/api/");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.message, "InfiLearn LMS backend is running");
});

test("GET /api/health returns db time", async () => {
  mockPoolQuery(async (sql) => {
    if (String(sql).includes("SELECT NOW()")) {
      return { rows: [{ server_time: "2026-03-27T00:00:00.000Z" }] };
    }

    throw new Error(`Unexpected SQL in health test: ${sql}`);
  });

  const response = await request(app).get("/api/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.status, "ok");
});

test("GET /api/readiness returns ready when schema tables exist", async () => {
  mockPoolQuery(async (sql) => {
    const normalized = String(sql).trim();

    if (normalized.includes("SELECT NOW()")) {
      return { rows: [{ server_time: "2026-03-27T00:00:00.000Z" }] };
    }

    if (normalized.includes("to_regclass('public.users')")) {
      return {
        rows: [
          {
            users: true,
            courses: true,
            modules: true,
            lessons: true,
            quizzes: true,
            enrollments: true
          }
        ]
      };
    }

    throw new Error(`Unexpected SQL in readiness test: ${sql}`);
  });

  const response = await request(app).get("/api/readiness");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.status, "ready");
  assert.deepEqual(response.body.checks.missingTables, []);
});

test("POST /api/auth/register validates required fields", async () => {
  const response = await request(app).post("/api/auth/register").send({ email: "a@b.com" });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
});

test("POST /api/courses requires auth token", async () => {
  const response = await request(app).post("/api/courses").send({ title: "Course 1" });

  assert.equal(response.status, 401);
  assert.equal(response.body.success, false);
});

test("POST /api/modules/:moduleId/lessons requires auth token", async () => {
  const response = await request(app).post("/api/modules/1/lessons").send({ title: "Lesson A" });

  assert.equal(response.status, 401);
  assert.equal(response.body.success, false);
});
