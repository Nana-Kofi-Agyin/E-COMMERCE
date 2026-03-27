# Database Schema

The file `backend/sql/lms_schema.sql` defines a PostgreSQL schema for a Learning Management System (LMS).

## Core Design

### Enum Type

- `user_role`: `admin`, `instructor`, `student`

### Shared Trigger Function

- `set_updated_at()` automatically updates `updated_at` before row updates.

## Tables and Purpose

1. `users`
- Stores all platform users.
- Includes role, email uniqueness, and password hash.

2. `courses`
- Stores courses created by instructors.
- References `users(id)` through `instructor_id`.

3. `modules`
- Stores course modules/sections.
- References `courses(id)`.

4. `lessons`
- Stores lesson content in modules.
- References `modules(id)`.

5. `quizzes`
- Stores quizzes linked to lessons.
- References `lessons(id)`.

6. `enrollments`
- Join table between users and courses.
- Enforces one enrollment per user/course pair with a unique constraint.

## Referential Integrity

Foreign keys use `ON DELETE CASCADE` to clean child records automatically when a parent is removed.

## Indexing

Explicit indexes exist for:

- `enrollments.user_id`
- `enrollments.course_id`
- `courses.instructor_id`
- `modules.course_id`
- `lessons.module_id`
- `quizzes.lesson_id`

These improve common lookup performance.

## Update Triggers

Each table has a `BEFORE UPDATE` trigger to run `set_updated_at()`:

- `users`
- `courses`
- `modules`
- `lessons`
- `quizzes`
- `enrollments`
