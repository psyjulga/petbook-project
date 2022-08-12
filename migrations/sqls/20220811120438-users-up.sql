CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(25) UNIQUE,
  first_name VARCHAR(25),
  last_name VARCHAR(25),
  email VARCHAR(25) UNIQUE,
  country VARCHAR(25),
  city VARCHAR(25),
  profile_pic_path VARCHAR,
  password VARCHAR
);