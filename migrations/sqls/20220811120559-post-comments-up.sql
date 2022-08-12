CREATE TABLE post_comments(
  comment_id SERIAL PRIMARY KEY,
  date DATETIME,
  text TEXT,
  post_id bigint REFERENCES posts(post_id),
  user_id bigint REFERENCES users(user_id)
);