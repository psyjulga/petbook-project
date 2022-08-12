CREATE TABLE posts(
  post_id SERIAL PRIMARY KEY,
  date DATETIME,
  text TEXT,
  image_path VARCHAR,
  video_path VARCHAR,
  author VARCHAR(25),
  user_id bigint REFERENCES users(user_id)
);