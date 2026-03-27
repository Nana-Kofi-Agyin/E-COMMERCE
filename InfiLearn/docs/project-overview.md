# Project Overview

## What Has Been Built

The project currently contains a working backend service and an empty frontend workspace.

### Backend

- Entry point starts an HTTP server and loads configuration.
- Express app is configured with security and parsing middleware.
- API root and health-check routes are available.
- PostgreSQL pool is configured and tested on startup.
- Graceful shutdown logic closes the server and DB pool on `SIGINT`/`SIGTERM`.
- Standard error and 404 handlers are implemented.

### Frontend

- `frontend/` exists but currently has no files.

## Backend Structure Summary

- `backend/index.js`: Starts server, checks DB connectivity, handles shutdown.
- `backend/src/app.js`: Creates the Express app and mounts middleware/routes.
- `backend/src/config/env.js`: Loads `.env` variables and defines defaults.
- `backend/src/config/db.js`: Configures PostgreSQL pool and connection check.
- `backend/src/routes/index.js`: Defines root and health endpoints.
- `backend/src/middleware/errorHandler.js`: Handles not-found and runtime errors.
- `backend/sql/lms_schema.sql`: Defines LMS database tables, triggers, and indexes.

## Dependencies Installed

Runtime dependencies:
- `express`
- `pg`
- `dotenv`
- `helmet`
- `cors`
- `bcrypt`
- `jsonwebtoken`

Development dependency:
- `nodemon`
