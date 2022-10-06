CREATE TABLE posts(
  post_id SERIAL PRIMARY KEY,
  date TIMESTAMP,
  post_title VARCHAR(25) NOT NULL,
  text TEXT NOT NULL,
  image VARCHAR(50),
  video VARCHAR(50),
  user_id bigint REFERENCES users(user_id)
);

INSERT INTO posts(
  post_id, date, post_title, text, user_id
) VALUES (
  default, '2022-04-18 12:18:15', 'Happy Easter', 'Successfully delivered all easter eggs', '2' 
);

INSERT INTO posts(
  post_id, date, post_title, text, user_id
) VALUES (
  default, '2022-07-31 16:14:25', '39 degrees!!', 'oh my gosh it is so hot, we are melting away here', '1' 
);

INSERT INTO posts(
  post_id, date, post_title, text, user_id
) VALUES (
  default, '2022-08-23 18:42:25', 'test-title', 'test-post', '3' 
);

INSERT INTO posts(
  post_id, date, post_title, text, user_id
) VALUES (
  default, '2022-08-23 19:38:25', 'do-not-delete', 'do-not-delete', '4' 
);

INSERT INTO posts(
  post_id, date, post_title, text, user_id
) VALUES (
  default, '2022-08-23 21:33:25', 'DELETE', 'DELETE', '4' 
);

