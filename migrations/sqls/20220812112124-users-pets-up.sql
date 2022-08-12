CREATE TABLE users_pets(
  users_pets_id SERIAL PRIMARY KEY,
  user_id bigint REFERENCES users(user_id),
  pet_id bigint REFERENCES pets(pet_id)
);