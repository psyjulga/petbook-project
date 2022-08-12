import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

// import routes
import user_routes from './handlers/users'

dotenv.config()

const app: Application = express()
const address: string = '0.0.0.0:3000'
const port = process.env.SERVER_PORT

app.use(cors())
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
	res.send('server running!')
})

// routes(app)
user_routes(app)

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, function () {
		console.log(`server running at: ${address}`)
	})
}

export default app
