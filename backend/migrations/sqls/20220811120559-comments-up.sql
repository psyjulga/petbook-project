CREATE TABLE comments(
  comment_id SERIAL PRIMARY KEY,
  date TIMESTAMP,
  text TEXT NOT NULL,
  post_id bigint REFERENCES posts(post_id),
  user_id bigint REFERENCES users(user_id)
);

INSERT INTO comments(
  comment_id, date, text, post_id, user_id
) VALUES (
 default , '2022-05-01 12:00:34', 'thanks as always buddy!!', '1', null
);

INSERT INTO comments(
  comment_id, date, text, post_id, user_id
) VALUES (
  default, '2022-08-01 08:10:04', 'absolutely - even now in the morning, my rabbit is hiding in the shadow', '2', '2'
);

INSERT INTO comments(
  comment_id, date, text, post_id, user_id
) VALUES (
  default, '2022-08-01 09:11:54', 'the cat enjoys it, but the poor donkey suffers', '2', '1'
);

INSERT INTO comments(
  comment_id, date, text, post_id, user_id
) VALUES (
  default, '2022-08-23 18:58:54', 'test-comment', '3', '3'
);

INSERT INTO comments(
  comment_id, date, text, post_id, user_id
) VALUES (
  default, '2022-08-23 20:22:54', 'do-not-delete', '4', '4'
);

INSERT INTO comments(
  comment_id, date, text, post_id, user_id
) VALUES (
  default, '2022-08-23 20:28:54', 'DELETE', '4', '4'
);

