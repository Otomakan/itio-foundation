import bcrypt from 'bcryptjs'

export const encrypt = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

export const compare = async (plainPass: string, hashword: string): Promise<boolean> => {
	return await bcrypt.compare(plainPass, hashword)
}
