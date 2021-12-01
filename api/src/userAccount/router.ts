import {UserAccount} from './types'
import { Router } from 'express'
import { Request , Response, NextFunction } from 'express'
const router = Router()
// import invitesRoute from './invites/router'


import userAccountValidator from './validator'
import userAccountService from './service'

// router.use(invitesRoute)

// interface Request extends ERequest {
// 	user: UserAccount;
// }

router.get('/current',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req?.user?.id || ''
			const userAccounts = await userAccountService.getInfo(userId)
			res.send(userAccounts)
		} catch (e) {
			next(e)
		}
	})

// No authorizer everybody can access userAccounts
router.get('/:id',

	async (req: Request, res: Response, next: NextFunction) => {
		try {

			const userAccountId: string = req.params.id

			const userAccount = await userAccountService.getInfo(userAccountId)
			res.send(userAccount)
		} catch (e) {
			next(e)
		}
	})

router.post('/',

	userAccountValidator.newUserAccount,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const newUserAccount: UserAccount = { ...req.body }

			const userAccountId = await userAccountService.create(newUserAccount)
			res.status(200).send({ userAccountId })
		} catch (e) {
			next(e)
		}
	}
)
router.put('/',

	userAccountValidator.updateUserAccount,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userInfo: UserAccount = { ...req.body }
			const id = userInfo.id || req.user?.id || ''
			const userAccountId = await userAccountService.update({...userInfo, id})
			res.status(200).send({ userAccountId })
		} catch (e) {
			next(e)
		}
	}
)

router.delete('/',

	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await userAccountService.deleteOne(req.body.userAccountId)
			res.sendStatus(204)
		} catch (e) {
			next(e)
		}
	}
)

router.get('/search',

	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const query = req.query


			const term = req?.query?.term?.toString() || ''
			if (!req.user) {
				const userAccountsRes = await userAccountService.search(term)
				return res.send(userAccountsRes)
			}

		} catch (e) {
			next(e)
		}
	}
)



// router.post('/password/lost',
// 	userAccountValidator.forgotPassword,
// 	async (req: Request, res: Response, next) => {
// 		try {
// 			await userAccountService.forgotPassword(req.body.email)
// 			res.status(200).send('success')
// 		} catch (e) {
// 			next(e)
// 		}
// 	}
// )

// router.post('/password/reset/:hashedUID',
// 	userAccountValidator.newPassword,
// 	async (req: Request, res: Response, next) => {
// 		try {
// 			const hashedUID = req.params.hashedUID
// 			await userAccountService.resetForgottenPassword(hashedUID, req.body.password)
// 			res.status(200).send('success')
// 		} catch (e) {
// 			next(e)
// 		}
// 	}
// )

// router.put('/password',
// 	async (req: Request, res: Response, next) => {
// 		try {

// 			const {oldPassword, newPassword} = req.body
// 			const userAccountId = req.user.id
// 			const userInfo = await userAccountDao.getInfo(userAccountId)
// 			const isValid = await comparePassword(oldPassword, userInfo.password)
// 			if(!isValid) {
// 				return res.status(401).send('Invalid password')
// 			}
// 			await userAccountService.updatePassword(userAccountId, newPassword)

// 			res.status(200).send('success')
// 		} catch (e) {
// 			next(e)
// 		}
// 	}
// )







export default router
