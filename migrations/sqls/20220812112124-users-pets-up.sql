CREATE TABLE users_pets(
  users_pets_id SERIAL PRIMARY KEY,
  user_id bigint REFERENCES users(user_id),
  pet_id bigint REFERENCES pets(pet_id)
);

INSERT INTO users_pets (
  users_pets_id, user_id, pet_id) 
  VALUES (default, '1', '1');

INSERT INTO users_pets (
  users_pets_id, user_id, pet_id) 
  VALUES (default, '1', '3');

INSERT INTO users_pets (
  users_pets_id, user_id, pet_id) 
  VALUES (default, '2', '2');