import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// EXPRESS MIDDLEWARE FUNCTION
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
	if (process.env.NODE_ENV !== 'test') {
		try {
			const authorizationHeader = req.headers.authorization
			const token = authorizationHeader?.split(' ')[1]
			const tokenSecret = process.env.TOKEN_SECRET
			const decoded = jwt.verify(token as string, tokenSecret as string)
			return next()
		} catch (e) {
			console.log(e)
			res.status(403) // not authorized
			res.json(e)
		}
	}
	next()
}

export default verifyAuthToken
