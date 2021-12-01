import passport from 'passport'
import passportLocal from 'passport-local'
import  userDao from '../userAccount/dao'
import { comparePassword } from '../userAccount/utils'
import {UserAccount} from '../userAccount/types'
const LocalStrategy = passportLocal.Strategy


//@ts-ignore
passport.serializeUser<any, any>((user: UserAccount, done: Function) => {
	done(undefined, user.id)
})


passport.deserializeUser(async (id: string, done: any) => {
	try {
		const user = await userDao.getInfo(id) as UserAccount
		if (user)
			done(null, user)
		else {
			throw new Error('User not found')
		}
	}
	catch (e) {
		done(e, null)
	}
})


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
	try {
		const user = await userDao.getInfoByEmail(email)

		if (!user) {
			return done(new Error('Invalid Login'))
		}

		const isPasswordValid = await comparePassword(password, user.password||'')

		if (isPasswordValid) {
			return done(undefined, user)
		}

		return done(new Error('Invalid Login'))
	}
	catch (e) {
		return done(e)
	}
}))

