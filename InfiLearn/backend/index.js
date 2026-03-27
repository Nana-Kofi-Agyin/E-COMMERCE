const app = require("./src/app");
const env = require("./src/config/env");
const { checkDbConnection, pool } = require("./src/config/db");

const server = app.listen(env.port, async () => {
  console.log(`InfiLearn backend listening on port ${env.port}`);

  try {
    await checkDbConnection();
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
});

async function shutdown(signal) {
  console.log(`${signal} received. Gracefully shutting down...`);

  server.close(async () => {
    try {
      await pool.end();
      console.log("Database pool closed");
      process.exit(0);
    } catch (err) {
      console.error("Error while closing DB pool:", err.message);
      process.exit(1);
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
