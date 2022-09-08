# PETBOOK PROJECT

After two backend courses with an image API project and a shopping app API project, where we used NodeJS, Express, Typescript and Jest, we combined our knowledge of front- and backend development to build a fullstack project. The very last - the final Masterschool project. Petbook is a facebook for pet owners - come and create an account yourself! 🐹  

⚠ THIS WORK IS STILL IN PROGRESS ⚠

- final fullstack project for the masterschool web development bootcamp
- react, redux, typescript, jest, postgres

## PROJECT SETUP

1. cd backend => run `npm install` to install all dependencies

- cd frontend => run `npm install` to install all dependencies

2. run `npm run db` to start docker / postgres container

3. Create database and users in psql:

- CREATE USER petbook_user WITH PASSWORD 'lovepets';
- CREATE DATABASE petbook_database;
- CREATE DATABASE petbook_test_database;
- GRANT ALL PRIVILEGES ON DATABASE petbook_database TO petbook_user;
- GRANT ALL PRIVILEGES ON DATABASE petbook_test_database TO petbook_user;

4. run `npm run migrate-up` to populate database

5. launch the project

- 1. cd backend: start backend server => run `npm run watch` => backend port 8000
- 2. cd frontend: start frontend => run `npm run start-react` => frontend port 3000
