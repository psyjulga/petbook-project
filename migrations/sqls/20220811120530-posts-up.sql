CREATE TABLE posts(
  post_id SERIAL PRIMARY KEY,
  date TIMESTAMP,
  text TEXT,
  image BYTEA,
  video BYTEA,
  author VARCHAR(25),
  user_id bigint REFERENCES users(user_id)
);

INSERT INTO posts(
  post_id, date, text, author, user_id
) VALUES (
  default, '2022-04-18 12:18:15', 'Successfully delivered all easter eggs', 'Anton', '2' 
);

INSERT INTO posts(
  post_id, date, text, author, user_id
) VALUES (
  default, '2022-07-31 16:14:25', 'oh my gosh it is so hot, we are melting away here', 'Ladybug', '1' 
);

