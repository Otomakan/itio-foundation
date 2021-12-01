import {UserAccount} from '../userAccount/types'
import jwt, { JwtPayload } from 'jsonwebtoken'
export const readAndValidateAuthToken = (token: string): Promise<UserAccount> => {
	return new Promise((resolve, reject) => {
		try {
			const parsedToken = jwt.verify(token, process.env.jwtAuthTokenSecret||'test') as JwtPayload
			const user = parsedToken.user
			resolve(user)

		} catch(e) {
			(err: Error, parsedToken: any) => {
				if (err) throw err
				const user = parsedToken.user
				resolve(user)
			}
		}
		reject(new Error('Invalid request'))
	})
}

export const createAuthToken = (user: UserAccount): string => {
	return jwt.sign({ user },  process.env.jwtAuthTokenSecret||'test', { expiresIn: '7 days' })
}
