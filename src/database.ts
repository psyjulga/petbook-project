import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
	POSTGRES_URL,
	POSTGRES_DB,
	POSTGRES_TEST_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	NODE_ENV,
} = process.env

const client = new Pool({
	host: POSTGRES_URL,
	database: NODE_ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
})

export default client
