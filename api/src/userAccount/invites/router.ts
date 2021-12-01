// import { Router } from 'express'
// import { Request, Response, NextFunction } from 'express'
// const router = Router()

// import { userAuthorizer } from '../../middleware/userAuthorizer'
// import {sendInviteEmail} from './service'

// type InviteEmailTemplateTypes = 'default' | 'industrias'

// router.post('/:userId/invites/:template',
// 	userAuthorizer({
// 		manager: {
// 			admin: true,
// 			member: false
// 		},
// 		client: {
// 			admin: true,
// 			member:false
// 		}
// 	}),
// 	async (req: Request, res: Response, next: NextFunction) => {
// 		try {
// 			const userId: string = req.params.userId
// 			const template = req.params.template as InviteEmailTemplateTypes || 'default' as InviteEmailTemplateTypes
// 			const userAccount = await sendInviteEmail(userId, template)
// 			res.send(userAccount)
// 		} catch (e) {
// 			console.log(e)
// 			next(e)
// 		}
// 	})


// export default router
