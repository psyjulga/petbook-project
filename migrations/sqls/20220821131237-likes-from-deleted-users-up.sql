CREATE TABLE likesFromDeletedUsers(
  like_id SERIAL PRIMARY KEY,
  post_id bigint REFERENCES posts(post_id),
  user_id VARCHAR(25)
);