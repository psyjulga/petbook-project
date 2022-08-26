CREATE TABLE likes(
  like_id SERIAL PRIMARY KEY,
  post_id bigint REFERENCES posts(post_id),
  user_id bigint REFERENCES users(user_id)
);

INSERT INTO likes(
  like_id, post_id, user_id
) VALUES (
  default, '1', '1'
);

INSERT INTO likes(
  like_id, post_id, user_id
) VALUES (
  default, '3', '3'
);

INSERT INTO likes(
  like_id, post_id, user_id
) VALUES (
  default, '4', '4'
);

INSERT INTO likes(
  like_id, post_id, user_id
) VALUES (
  default, '4', '5'
);