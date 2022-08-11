npm install
npm run db

CREATE USER petbook_user WITH PASSWORD 'lovepets';
CREATE DATABASE petbook_database;
CREATE DATABASE petbook_test_database;
GRANT ALL PRIVILEGES ON DATABASE petbook_database TO petbook_user;
GRANT ALL PRIVILEGES ON DATABASE petbook_test_database TO petbook_user;

npm run migrate-up
