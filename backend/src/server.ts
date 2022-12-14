import express, { Application, Request, Response } from 'express'
import fileupload from 'express-fileupload'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import user_routes from './handlers/users'
import pet_routes from './handlers/pets'
import post_routes from './handlers/posts'
import comment_routes from './handlers/comments'
import like_routes from './handlers/likes'
import shared_routes from './handlers/shared'

dotenv.config()

const app: Application = express()
const address: string = '0.0.0.0:8000'
const port = process.env.SERVER_PORT

app.use(
	fileupload({
		createParentPath: true,
	})
)

app.use(cors())
app.use(bodyParser.json())

app.get('/', function (_req: Request, res: Response) {
	res.send('server running!')
})

user_routes(app)
pet_routes(app)
post_routes(app)
comment_routes(app)
like_routes(app)
shared_routes(app)

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, function () {
		console.log(`server running at: ${address}`)
	})
}

export default app
