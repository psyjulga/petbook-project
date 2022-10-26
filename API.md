### USER ROUTES

| VERB   | ROUTE              | METHOD            | PROTECTED | DESCRIPTION                                                                                                                                                                                   |
| ------ | ------------------ | ----------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| get    | /users             | index             | -         | all users                                                                                                                                                                                     |
| get    | /users/:id         | show              | ✔         | one user by id => to show the logged in users profile                                                                                                                                         |
| post   | /users             | create            | -         | create a new user / sign up !! return value is the TOKEN OR null if user_name already taken => display message to user !!                                                                     |
| post   | /authenticate_user | authenticate      | -         | sign in / enter username and password => returns encrypted password(model) => returns token (handler) => display message to the user if username does not exist or if password is not correct |
| post   | /users/:id/pets    | addPetToUser      | ✔         | create a relation between a pet and a user !! how handle when pet already exists ?                                                                                                            |
| delete | /users/:id/pets    | removePetFromUser | ✔         | cancel a relation between user and pet (e.g. before deleting a pet => FK constraints!)                                                                                                        |
| put    | /users/:id         | edit              | ✔         | update a certain field of a certain user with a value                                                                                                                                         |
| delete | /users/:id         | destroy           | ✔         | delete a user => delete users' pets, posts, comments, likes => comments and likes preserved in new table => shown as "deleted user"                                                           |

### USER DATABASE SCHEMA => table users

| COLUMN      | DATA TYPE          | CONSTRAINT      |
| ----------- | ------------------ | --------------- |
| user_id     | SERIAL PRIMARY KEY | -               |
| user_name   | VARCHAR(25)        | NOT NULL UNIQUE |
| first_name  | VARCHAR(25)        | NOT NULL        |
| last_name   | VARCHAR(25)        | NOT NULL        |
| email       | VARCHAR(50)        | NOT NULL UNIQUE |
| country     | VARCHAR(25)        | -               |
| city        | VARCHAR(25)        | -               |
| profile_pic | VARCHAR(50)        | -               |
| password    | VARCHAR            | NOT NULL        |

### PET ROUTES

| VERB | ROUTE | METHOD | PROTECTED | DESCRIPTION |
| get | /pets | index | ✔ | all pets => to show on all pets page |
| get | /pets/:id | show | ✔ | one pet by id |
| get | /pets/:id/users | showPetsByUser | ✔ | to display all of the user's pets on the main page |
| get | /filter_pets | showPetsByProp | ✔ | to filter pets by their props (search field) |
| post | /pets | create | ✔ | create a new pet (triggers add pet to user) |
| put | /pets/:id | edit | ✔ | update a certein field of a certain pet with a value |
| delete | /pets/:id | destroy | ✔ | delete a pet (if pet has multiple users: remove pet from user) |

### PET DATABASE SCHEMA => table pets

| COLUMN          | DATA TYPE          | CONSTRAINT |
| --------------- | ------------------ | ---------- |
| pet_id          | SERIAL PRIMARY KEY | -          |
| type            | VARCHAR(25)        | NOT NULL   |
| breed           | VARCHAR(25)        | -          |
| pet_name        | VARCHAR(25)        | NOT NULL   |
| birthday        | DATE               | -          |
| color           | VARCHAR(25)        | -          |
| eye_color       | VARCHAR(25)        | -          |
| profile_pic     | VARCHAR(50)        | -          |
| about_paragraph | text               | -          |

### POST ROUTES

| VERB   | ROUTE            | METHOD          | PROTECTED | DESCRIPTION                                            |
| ------ | ---------------- | --------------- | --------- | ------------------------------------------------------ |
| get    | /posts           | index           | ✔         | all posts => to show in newsfeed                       |
| get    | /posts/:id       | show            | ✔         | one post by id                                         |
| get    | /posts/:id/users | showPostsByUser | ✔         | to display all of the user's posts on his profile page |
| post   | /posts           | create          | ✔         | create a new post                                      |
| put    | /posts/:id       | edit            | ✔         | update title or text of a certain post with a value    |
| delete | /posts/:id       | destroy         | ✔         | delete a post (comments and likes first)               |

### POST DATABASE SCHEMA => table posts

| COLUMN     | DATA TYPE          | CONSTRAINT                |
| ---------- | ------------------ | ------------------------- |
| post_id    | SERIAL PRIMARY KEY | -                         |
| date       | TIMESTAMP          | -                         |
| post_title | VARCHAR(25)        | NOT NULL                  |
| text       | TEXT               | NOT NULL                  |
| image      | VARCHAR(50)        | -                         |
| video      | VARCHAR(50)        | -                         |
| user_id    | bigint             | REFERENCES users(user_id) |

### COMMENT ROUTES

| VERB   | ROUTE               | METHOD             | PROTECTED | DESCRIPTION                                                                |
| ------ | ------------------- | ------------------ | --------- | -------------------------------------------------------------------------- |
| get    | /comments           | index              | ✔         | all comments (active and deleted users)                                    |
| get    | /comments/:id       | show               | ✔         | one comment by id (not for deleted users)                                  |
| get    | /comments/:id/posts | showCommentsByPost | ✔         | returns all comments related to a specific post (active and deleted users) |
| post   | /comments           | create             | ✔         | create a new comment                                                       |
| put    | /comments/:id       | edit               | ✔         | update the text field of a certain comment with a value                    |
| delete | /comments/:id       | destroy            | ✔         | delete a comment                                                           |

### COMMENT DATABASE SCHEMA => table comments

| COLUMN     | DATA TYPE          | CONSTRAINT                |
| ---------- | ------------------ | ------------------------- |
| comment_id | SERIAL PRIMARY KEY | -                         |
| date       | TIMESTAMP          | -                         |
| text       | TEXT               | NOT NULL                  |
| post_id    | bigint             | REFERENCES posts(post_id) |
| user_id    | bigint             | REFERENCES users(user_id) |

### LIKE ROUTES

index: all likes (active and deleted users)
showLikesByPost: returns all likes related to a specific post => arr.length & list usernames (active and deleted users)
create: create a new like - LIKE
destroy: delete a like - UNLIKE

### SHARED ROUTES => for file upload
