CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(25) NOT NULL UNIQUE,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  email VARCHAR(25) NOT NULL UNIQUE,
  country VARCHAR(25),
  city VARCHAR(25),
  profile_pic BYTEA,
  password VARCHAR NOT NULL
);

INSERT INTO users (
  user_id, user_name, first_name, last_name, email, country, city, profile_pic, password
) VALUES (
  default, 'Ladybug', 'Julia', 'Bestgen', 'psyjulga@yahoo.de', 'Germany', 'Cologne','src/pics/ladybug.jpg', 'secret123' 
);

INSERT INTO users (
  user_id, user_name, first_name, last_name, email, country, city, profile_pic, password
) VALUES (
  default, 'Ganesha', 'Lindsay', 'Brown', 'l.brown@gmx.com', 'India', 'Mumbai','src/ganesha/pics.jpg', 'secret456' 
);

INSERT INTO users (
  user_id, user_name, first_name, last_name, email, country, city, profile_pic, password
) VALUES (
  default, 'test-user', 'Mona', 'Lisa', 'm.lisa@louvre.fr', 'France', 'Paris', null, 'secret789' 
);

INSERT INTO users (
  user_id, user_name, first_name, last_name, email, country, city, profile_pic, password
) VALUES (
  default, 'do-not-delete', 'James', 'Bond', 'j.bond@secret-service.uk', 'UK', 'London', null, 'secret007' 
);

INSERT INTO users (
  user_id, user_name, first_name, last_name, email, country, city, profile_pic, password
) VALUES (
  default, 'do-not-delete-II', 'Jane', 'Doe', 'j.doe@secret-service.uk', 'UK', 'London', null, 'secret006' 
);

INSERT INTO users (
  user_id, user_name, first_name, last_name, email, country, city, profile_pic, password
) VALUES (
  default, 'DELETE', 'John', 'Doe', 'j.doeII@secret-service.uk', 'UK', 'London', null, 'secret005' 
);

