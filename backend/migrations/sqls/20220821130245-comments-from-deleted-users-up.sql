CREATE TABLE commentsFromDeletedUsers(
  comment_id SERIAL PRIMARY KEY,
  date TIMESTAMP,
  text TEXT NOT NULL,
  post_id bigint REFERENCES posts(post_id),
  user_id VARCHAR(25)
);

INSERT INTO commentsFromDeletedUsers (
  date, text, post_id, user_id
) VALUES (
  '2022-05-01 12:00:34', 'thanks as always buddy!!', '1', 'deleted_user'
);