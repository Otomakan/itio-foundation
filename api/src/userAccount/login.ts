import {UserAccount} from './types'
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import '../config/passport'
import { createAuthToken } from '../session/token'
/**
 * POST /login
* Login page.
 */
export const postLogin = (req: Request, res: Response, next: NextFunction) => {
	req.body.email = req.body.email.toLowerCase()
	passport.authenticate('local', (err: Error, user: UserAccount) => {
		if (err) {
			return res.status(401).send({ message: err.message })
		}
		if (!user) {
			return res.status(401).send('No')
		}

		//@ts-ignore
		req.login(user, (err:Error) => {
			if (err) { return next(err) }
			delete user.password
			const authToken = createAuthToken(user)
			res.cookie('AutonomyTSession', authToken,
				{
					maxAge: 24 * 60 * 60 * 100000,
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production'
				})
			return res.status(200).send({ ...user })
		})
	})(req, res, next)
}

export const logout = (req: Request, res: Response) => {
	req.logout()
	res.clearCookie('AutonomyTSession')
	res.sendStatus(200)
}
