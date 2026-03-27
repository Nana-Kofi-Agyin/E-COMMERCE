# Backend API

Base URL (local default):
- `http://localhost:5000`

Base route prefix:
- `/api`

## Endpoints

### 1) Service Root

- Method: `GET`
- Path: `/api/`
- Purpose: Quick confirmation that the backend service is running.
- Success response:

```json
{
  "success": true,
  "message": "InfiLearn LMS backend is running"
}
```

### 2) Health Check

- Method: `GET`
- Path: `/api/health`
- Purpose: Confirms API and database are reachable.
- Success response shape:

```json
{
  "success": true,
  "status": "ok",
  "dbTime": "<postgres timestamp>"
}
```

If database access fails, request is passed to the global error handler and returns an error JSON response.

### 3) Readiness Check

- Method: `GET`
- Path: `/api/readiness`
- Purpose: Confirms database connectivity and expected schema tables.
- Success response shape:

```json
{
  "success": true,
  "status": "ready",
  "dbTime": "<postgres timestamp>",
  "checks": {
    "database": true,
    "tables": {
      "users": true,
      "courses": true,
      "modules": true,
      "lessons": true,
      "quizzes": true,
      "enrollments": true
    },
    "missingTables": []
  }
}
```

### 4) Auth

#### Register

- Method: `POST`
- Path: `/api/auth/register`
- Body:

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "strong-password",
  "role": "student"
}
```

#### Login

- Method: `POST`
- Path: `/api/auth/login`
- Body:

```json
{
  "email": "jane@example.com",
  "password": "strong-password"
}
```

- Success response includes JWT token and basic user payload.

### 5) Courses

#### List Courses

- Method: `GET`
- Path: `/api/courses`

#### Get Course

- Method: `GET`
- Path: `/api/courses/:courseId`

#### Create Course (Protected)

- Method: `POST`
- Path: `/api/courses`
- Required roles: `admin` or `instructor`
- Requires `Authorization: Bearer <token>`

### 6) Modules (Course-Scoped)

#### List Modules for Course

- Method: `GET`
- Path: `/api/courses/:courseId/modules`

#### Create Module in Course (Protected)

- Method: `POST`
- Path: `/api/courses/:courseId/modules`
- Required roles: `admin` or `instructor`

### 7) Lessons (Module-Scoped)

#### List Lessons for Module

- Method: `GET`
- Path: `/api/modules/:moduleId/lessons`

#### Create Lesson in Module (Protected)

- Method: `POST`
- Path: `/api/modules/:moduleId/lessons`
- Required roles: `admin` or `instructor`

## Global Middleware Behavior

- `helmet`: Adds secure HTTP headers.
- `cors`: Allows origin from `CORS_ORIGIN` env var (or all origins if `*`).
- `express.json({ limit: "1mb" })`: Parses JSON payloads up to 1 MB.
- `express.urlencoded({ extended: true })`: Parses URL-encoded payloads.

## Error Responses

### Route Not Found

Any unmatched route returns:

```json
{
  "success": false,
  "message": "Route not found: <METHOD> <URL>"
}
```

### Server Errors

- Status code: `500` by default (or custom `err.statusCode` when provided).
- Body shape:

```json
{
  "success": false,
  "message": "Internal server error"
}
```

For non-500 custom errors, the response message uses `err.message`.
