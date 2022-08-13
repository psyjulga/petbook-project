CREATE TABLE posts(
  post_id SERIAL PRIMARY KEY,
  date DATETIME,
  text TEXT,
  image BYTEA,
  video BYTEA,
  author VARCHAR(25),
  user_id bigint REFERENCES users(user_id)
);