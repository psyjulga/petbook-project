CREATE TABLE commentsFromDeletedUsers(
  comment_id SERIAL PRIMARY KEY,
  date TIMESTAMP,
  text TEXT NOT NULL,
  post_id bigint REFERENCES posts(post_id),
  user_id VARCHAR(25)
);