import { check } from 'express-validator'
import { validateAll } from '../utils/validator'
import {compare as comparePassword} from './password/encryption'
import {userAccountIdExists, getInfo, emailExists} from './dao'

const passwordCheck = (field: string) => {
	return check(field).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'i')
}
const newUserAccount = [
	check('firstName').isLength({ min: 2, max: 100 }),
	check('lastName').isLength({ min: 3, max: 100 }),
	check('email').isEmail(),
	check('role').isIn(['Admin', 'Visitor']),
	passwordCheck('password'),

]

const id = [
	check('userAccountId').isNumeric().custom(async (value: string) => {
		const doesExist = await userAccountIdExists(value)
		if (doesExist !== true)
			throw new Error(`The userAccount with id ${value} does not exist`)
	})
]


const updateUserAccount = [
	check('firstName').isLength({ min: 2, max: 100 }),
	check('lastName').isLength({ min: 3, max: 100 }),
	check('email').isEmail(),
	check('role').isIn(['Admin', 'Member']),
]


const updatePassword = [
	check('currentPassword', 'Wrong Password').custom(async(password, {req})=> {
		const userId = req.user.id
		const user = await getInfo(userId)
		// No user found
		if (!user) {
			throw new Error('The user does not exist')
		}

		// Checking the hashed password
		const isPasswordValid = await comparePassword(password, user.password as string)
		if(!isPasswordValid){
			throw new Error('Invalid password')
		}
		return true
	}),
	check('passwordConfirmation').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation does not match password')
		}
		return true
	}),
	check('password', 'Password must be at least 6 characters long').isLength({min:6}),

]
const newPassword = [
	check('passwordConfirmation').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation does not match password')
		}
		return true
	}),
	passwordCheck('passwordConfirmation'),
	passwordCheck('password')
]
const forgotPassword  = [
	check('email').isEmail().custom(async(email)=>{
		const exists = await emailExists(email)

		if(!exists) {
			throw new Error('This email doesn\'t match any of our records')
		}
		return true
	})
]



const editUserAccount = [
	...newUserAccount,
	...id
]

const userAccountValidations = {
	newUserAccount,
	id,
	editUserAccount,
	newPassword,
	forgotPassword,
	updatePassword,
	updateUserAccount
}

export default validateAll(userAccountValidations)
