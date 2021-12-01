import { encryptPassword, comparePassword } from './utils'
import { getString } from '../../test/utils/generate'
import bcrypt from 'bcryptjs'

const sampleString = getString()
describe('password', () => {
	it('encryptPassword should match hash', async() => {
		const res = await encryptPassword(sampleString)
		const salt = await bcrypt.genSalt(10)
		const encryptedPassword = await bcrypt.hash(sampleString, salt)
		expect(res.substring(0, 6)).toBe(encryptedPassword.substring(0, 6))
		expect(res).not.toBe(encryptedPassword)
	})
	it('comparePassword should return true when compared to encrypted password', async() => {
		const salt = await bcrypt.genSalt(10)
		const encryptedPassword = await bcrypt.hash(sampleString, salt)
		const res = await comparePassword(sampleString, encryptedPassword)
		expect(res).toBe(true)
        
	})
})