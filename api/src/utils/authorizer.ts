import {UserAccount} from '../userAccount/types'
import { Request } from 'express'

/**
* Checks if the current role is in the roles array.
* If not then it checks if the first roles item is {
		manager: {
			admin: true,
			member: false
		}}
* If the current role is not in th e roles array or roles[0] is not all
* Then throws an error
* @param req
* @param authorizerObject
*/
const authorizer = (
	req: Request & { session: any, user: UserAccount },
	authorizerObject: any,
): void => {
	const user = req.user

	if (!user) {
		throw new Error('Not Authorized')
	}

	if (authorizerObject.all === true) {
		return
	}

	const { role } = user

	// if (role === 'SuperAdmin') {
	// 	return
	// }

	const roleVarName = role.toLowerCase()
	authorizerObject.role = roleVarName

}

export default authorizer
