
import  userAccountDao  from './dao'
import { encrypt } from './password/encryption'
import { UserAccount } from './types'
import { v4 as uuid } from 'uuid'


const getAll = async (): Promise<{ items: Array<UserAccount>, count: number }> => {
	const allUsers = await userAccountDao.getAll()
	const items = allUsers.map(user => {
		delete user.password
		return user
	})
	const count = await getCount()



	return {
		items, count
	}
}



const getCount = async (): Promise<number> => {
	const count = await userAccountDao.getCount()
	return count
}



const create = async (newUserAccount: UserAccount): Promise<string> => {
	if(!Object.hasOwnProperty.call(newUserAccount, 'password')){
		throw new Error('User account must have a password')
	}
	newUserAccount.password = await encrypt(newUserAccount.password as string)
	const userAccountId = await userAccountDao.create({ ...newUserAccount })
	//@ts-ignore
	newPasswordRequest({ id: userAccountId, ...newUserAccount })
	return userAccountId
}

const update = async (newUserAccount: UserAccount): Promise<string> => {
	const userAccountId = await userAccountDao.create({ ...newUserAccount })
	return userAccountId
}

// const newPasswordRequest = async (user: UserAccount): Promise<boolean> => {
// 	const uid = uuid()
// 	await userAccountDao.password.createPasswordChangeRequest(user.id, uid, new Date())
// 	const hashedUID = uid
// 	try {
// 		sendInitializePasswordEmail(user.email, hashedUID)
// 	} catch (e) {
// 		Sentry.captureException(`There was a problem sending an email to ${user.email}`)
// 	}
// 	return true
// }

// const sendInitializePasswordEmail = (email: string, hashedUID: string) => {
// 	const verificationURL = environmentModule.get(ConfigKeys.dashboardURL) + '/password/reset?id=' + hashedUID
// 	const emailToSend = {
// 		from: 'Jack Misteli users@autonomypower.com.au',
// 		to: email,
// 		subject: 'New Account',
// 		text: 'Someone invited you to joing our energy management platform',
// 		html: `
// 		<h1>Someone invited you to joing our energy management platform</h1>
// 		<p><a href='${verificationURL}'>Please click here to join us</a></p>
// 		`
// 	}
// 	sendMail(emailToSend)
// }

const getInfo = async (userAccountId: string): Promise<UserAccount> => {
	const userAccount = await userAccountDao.getInfo(userAccountId)
	delete userAccount.password
	return userAccount
}

const deleteOne = async (userAccountId: string): Promise<boolean> => {
	await userAccountDao.deleteOne(userAccountId)
	return true
}

const search = async (searchTerm: string): Promise<{ items: Array<UserAccount>, count: number }> => {
	const userAccounts = await userAccountDao.search(searchTerm)
	const count = await userAccountDao.getSearchCount(searchTerm)
	return { items: userAccounts, count }
}



// const resetForgottenPassword = async (hashedUID: string, password: string): Promise<boolean> => {
// 	const uid = hashedUID
// 	const passwordChangeRequest = await userAccountDao.password.getPasswordChangeRequest(uid)
// 	const { time, userAccountId } = passwordChangeRequest
// 	const expiryDate = time.getTime() + (1 * 24 * 60 * 60 * 1000)
// 	const expired = Date.now() > expiryDate
// 	if (expired) {
// 		throw new Error('This request is too old')
// 	}
// 	await updatePassword(userAccountId, password)
// 	return true
// }





// const forgotPassword = async (email: string): Promise<boolean> => {
// 	const user = await userAccountDao.getInfoByEmail(email)
// 	const uid = uuid()
// 	await userAccountDao.password.createPasswordChangeRequest(user.id, uid, new Date())
// 	const hashedUID = uid
// 	sendForgotPasswordEmail(email, hashedUID)
// 	return true
// }

// const sendForgotPasswordEmail = (email: string, hashedUID: string) => {
// 	const verificationURL = environmentModule.get(ConfigKeys.dashboardURL) + '/password/reset?id=' + hashedUID
// 	const emailToSend = {
// 		from: 'Jack Misteli users@autonomypower.com.au',
// 		to: email,
// 		subject: 'Autonomy Power Forgot Password',
// 		text: 'Here is your confirmation',
// 		html: `
// 		<h1>Hey it looks like you requested a password change</h1>
// 		<p> Here is a reset link : ${verificationURL}</p>
// 		`
// 	}
// 	sendMail(emailToSend)
// }

// const updatePassword = async (userId: string, newPassword: string): Promise<boolean> => {
// 	const hashedPassword = await encrypt(newPassword)
// 	await userAccountDao.password.updatePassword(userId, hashedPassword)
// 	return true
// }


export default {
	// getAccessibleSites,
	create,
	getAll,
	// forgotPassword,
	getInfo,
	deleteOne,
	getCount,
	search,
	// getAllForUserOrganization,
	// resetForgottenPassword,
	update,
	// updatePassword
}
