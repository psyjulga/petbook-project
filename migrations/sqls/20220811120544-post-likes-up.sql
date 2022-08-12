CREATE TABLE post_likes(
  like_id SERIAL PRIMARY KEY,
  post_id bigint REFERENCES posts(post_id),
  user_id bigint REFERENCES users(user_id)
);