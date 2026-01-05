-- Wedding Website RSVP Database Initialization
-- This file is executed once when the PostgreSQL container is first created

\echo 'Starting database initialization...'

-- Run the schema
\i /docker-entrypoint-initdb.d/schema.sql

\echo 'Database schema created successfully.'

-- Note: Admin user will be created via application setup script
-- Password should be hashed using bcrypt before insertion
-- Example (run this separately after hashing password):
-- INSERT INTO admin_users (username, password_hash)
-- VALUES ('admin', '$2b$10$...');

\echo 'Database initialization complete!'
\echo 'Remember to create admin user using the setup script.'
