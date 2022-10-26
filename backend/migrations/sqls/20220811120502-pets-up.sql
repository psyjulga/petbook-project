CREATE TABLE pets(
  pet_id SERIAL PRIMARY KEY,
  type VARCHAR(25) NOT NULL,
  breed VARCHAR(25),
  pet_name VARCHAR(25) NOT NULL,
  birthday DATE,
  color VARCHAR(25),
  eye_color VARCHAR(25),
  profile_pic VARCHAR(50),
  about_paragraph text
);

INSERT INTO pets(
  pet_id, type, breed, pet_name, birthday, color, eye_color, profile_pic, about_paragraph
) VALUES (
  default, 'cat', 'Norwegian Forest Cat', 'Marilyn', '2002-05-22', 'black', 'yellow', 'Marilyn.jpg', 'best cat ever'
);

INSERT INTO pets(
  pet_id, type, pet_name, birthday, color, eye_color, profile_pic, about_paragraph
) VALUES (
  default, 'rabbit', 'Anton', '2019-07-30', 'white', 'black', 'Kaninchen.jpg', 'worlds fluffiest rabbit'
);

INSERT INTO pets(
  pet_id, type, pet_name, birthday, color, eye_color, profile_pic
) VALUES (
  default, 'donkey', 'Fluffy', '2014-02-05', 'grey', 'black', 'Fluffy.jpg'
);

INSERT INTO pets(
  pet_id, type, breed, pet_name, birthday, color, eye_color, profile_pic
) VALUES (
  default, 'test-dog', 'Malteser', 'Sherley', '2012-08-20', 'white', 'black', null
);

INSERT INTO pets(
  pet_id, type, pet_name, birthday, color, eye_color, profile_pic
) VALUES (
  default, 'do-not-delete', 'do-not-delete', '2012-08-20', 'white', 'black', null
);