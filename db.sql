CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    user1 VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(100) NOT NULL,
    current_location VARCHAR(100) NOT NULL
);

CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    location_url VARCHAR(200) NOT NULL,
    tag VARCHAR(200) NOT NULL,
    location_name VARCHAR(200) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);




-- funtionally a todo list
-- CREATE TABLE location_notes (
--     location_id SERIAL PRIMARY KEY,
--     user_input ,
--     location_name VARCHAR(100) NOT NULL,
--     location_url VARCHAR(200) NOT NULL,
--     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
-- );



