# Setup and Run Guide

## Backend Prerequisites

- Node.js (recommended current LTS)
- PostgreSQL

## Install Dependencies

From the `backend/` directory:

```bash
npm install
```

## Environment Variables

Create a `.env` file in `backend/` and define:

```env
NODE_ENV=development
PORT=5000
CORS_ORIGIN=*
JWT_SECRET=change-me
JWT_EXPIRES_IN=7d

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=infilearn
DB_SSL=false
```

Notes:
- If DB variables are missing, startup prints warnings and uses defaults.
- `DB_SSL=true` enables SSL with `rejectUnauthorized: false` in the current setup.

## Create Database Schema

Apply SQL in `backend/sql/lms_schema.sql` to your PostgreSQL database.

## Run the Backend

Development mode (auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Syntax check:

```bash
npm run check
```

Run API contract tests:

```bash
npm test
```

## Verify Service

- `GET /api/` should confirm service is running.
- `GET /api/health` should return DB server time.
- `GET /api/readiness` should confirm required tables are present.

## Graceful Shutdown

On `Ctrl+C` or termination signal, the app:
- Stops accepting new HTTP connections.
- Closes PostgreSQL pool connections.
- Exits cleanly.
