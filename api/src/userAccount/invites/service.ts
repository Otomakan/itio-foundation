
// import {v4 as uuid} from 'uuid'

// import { userAccount as userAccountDao} from '@autonomy-power/dao'
// import {sendMail} from '../../email/sendMail'
// import {generateInviteEmail} from './generateEmail/index'
// type InviteEmailTemplateTypes = 'default' | 'industrias'

// export const sendInviteEmail = async  ( userAccountID: string, template: InviteEmailTemplateTypes = 'default'): Promise<boolean> => {
// 	const user = await userAccountDao.getInfo(userAccountID)
// 	const uid = uuid()
// 	await userAccountDao.password.createPasswordChangeRequest(user.id, uid, new Date())
// 	const hashedUID = uid
// 	const email = generateInviteEmail(user, hashedUID, template)
// 	await sendMail(email)
// 	return true
// }


