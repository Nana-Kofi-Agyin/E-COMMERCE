-- PostgreSQL DDL for a Learning Management System (LMS)

-- Role enum for application users
CREATE TYPE user_role AS ENUM ('admin', 'instructor', 'student');

-- Shared trigger function to auto-maintain updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Users
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  instructor_id BIGINT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_courses_instructor
    FOREIGN KEY (instructor_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- Modules
CREATE TABLE modules (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL,
  title VARCHAR(200) NOT NULL,
  module_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_modules_course
    FOREIGN KEY (course_id)
    REFERENCES courses(id)
    ON DELETE CASCADE
);

-- Lessons
CREATE TABLE lessons (
  id BIGSERIAL PRIMARY KEY,
  module_id BIGINT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  lesson_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_lessons_module
    FOREIGN KEY (module_id)
    REFERENCES modules(id)
    ON DELETE CASCADE
);

-- Quizzes
CREATE TABLE quizzes (
  id BIGSERIAL PRIMARY KEY,
  lesson_id BIGINT NOT NULL,
  title VARCHAR(200) NOT NULL,
  total_marks INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_quizzes_lesson
    FOREIGN KEY (lesson_id)
    REFERENCES lessons(id)
    ON DELETE CASCADE
);

-- Enrollments (many-to-many between users/students and courses)
CREATE TABLE enrollments (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  course_id BIGINT NOT NULL,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_enrollments_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_enrollments_course
    FOREIGN KEY (course_id)
    REFERENCES courses(id)
    ON DELETE CASCADE,
  CONSTRAINT uq_enrollments_user_course UNIQUE (user_id, course_id)
);

-- Requested performance indexes
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);

-- Additional useful lookup indexes
CREATE INDEX idx_courses_instructor_id ON courses(instructor_id);
CREATE INDEX idx_modules_course_id ON modules(course_id);
CREATE INDEX idx_lessons_module_id ON lessons(module_id);
CREATE INDEX idx_quizzes_lesson_id ON quizzes(lesson_id);

-- Update timestamp triggers
CREATE TRIGGER trg_users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_courses_set_updated_at
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_modules_set_updated_at
BEFORE UPDATE ON modules
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_lessons_set_updated_at
BEFORE UPDATE ON lessons
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_quizzes_set_updated_at
BEFORE UPDATE ON quizzes
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_enrollments_set_updated_at
BEFORE UPDATE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
