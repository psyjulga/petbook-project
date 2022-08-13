CREATE TABLE pets(
  pet_id SERIAL PRIMARY KEY,
  type VARCHAR(25),
  breed VARCHAR(25),
  name VARCHAR(25),
  birthday DATE,
  color VARCHAR(25),
  eye_color VARCHAR(25),
  profile_pic BYTEA
);