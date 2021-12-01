
import { NextFunction, Request, Response } from 'express'
import {readAndValidateAuthToken} from './token'
export const authorizeUser =async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
	try {
		const authHeader = req.cookies['AutonomyTSession']
		const user =  await readAndValidateAuthToken(authHeader)
		//@ts-ignore
		req.user = user
		return next()
	} catch (e) {
		next()
	}
}

