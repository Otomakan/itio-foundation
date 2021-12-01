import {v1 as uuid} from 'uuid'
import { dbClient } from '../db'
// Write handler in case index is not found
import { searchQueryBuilder } from '../db/queryBuilder'
import { camelToSnake } from '../utils/camelSnake'
import { UserAccount, UserRoleType } from './types'
const columnNames = [
	'email',
	'role',
	'password',
	'first_name',
	'last_name',
	'organization_id'
]

export const serialize = (rows: Array<any>): Array<UserAccount> => {
	const serialized = rows.map(row => {
		const rowCopy = {
			'firstName': '',
			'lastName': '',
			'email': '',
			'role': 'Visitor' as UserRoleType,
			'password': '',
			'id': '',
		} as UserAccount

		for (const key in rowCopy) {
			if (Object.hasOwnProperty.call(row, camelToSnake(key))) {
				//@ts-ignore
				rowCopy[key] = row[camelToSnake(key)]
			}
		}

		return rowCopy
	})
	return serialized
}


export const getInfo = async (userAccountId: string) => {
	const userRes = await dbClient.query('SELECT * FROM user_account WHERE id=$1', [userAccountId])
	const userAccount = serialize(userRes.rows)[0]
	return userAccount
}


export const getInfoByEmail = async (email: string) => {
	const userRes = await dbClient.query('SELECT * FROM user_account WHERE email=$1', [email])
	const userAccount = serialize(userRes.rows)[0]

	return userAccount
}


export const getAll = async (): Promise<Array<UserAccount>> => {
	const queryStr = `
	SELECT
	u.id, u.email, u.role, u.password,u.id, first_name, last_name
	FROM
	user_account u
	`

	const res = await dbClient.query(queryStr)

	return serialize(res.rows)
}


export const userAccountIdExists = async (userAccountId: string): Promise<boolean> => {
	const res = await dbClient.query(
		'select exists(select 1 from user_account where  id=$1)',
		[userAccountId])
	return res.rows[0].exists
}
export const emailExists = async (email: string): Promise<boolean> => {
	const res = await dbClient.query(
		'select exists(select 1 from user_account where  email=$1)',
		[email])
	return res.rows[0].exists
}


export const create = async (newUserAccount: UserAccount): Promise<string> => {
	const { firstName, lastName, email, role, password } = newUserAccount
	const id = uuid()

	const query = `
	INSERT INTO user_account(id, first_name, last_name, email, role, password, organization_id)
	 VALUES ($1, $2,$3,$4, $5, $6, $7) RETURNING id`
	const res = await dbClient.query(query, [id, firstName, lastName, email, role, password])
	const userAccountId = res.rows[0].id
	return userAccountId
}


export const deleteOne = async (userAccountId: string): Promise<boolean> => {
	await dbClient.query('DELETE FROM user_account where id=$1', [userAccountId])
	return true
}


const getCount = async (): Promise<number> => {
	const qs = `
	SELECT COUNT(*) FROM user_account
	`
	const res = await dbClient.query(qs)
	return res.rows[0].count
}


const getSearchCount = async (searchTerm: string): Promise<number> => {
	const qs = `
		SELECT COUNT(*) FROM user_account  r
		WHERE LOWER(r.name) LIKE  LOWER($1)
	`

	const searchValue = '%' + searchTerm + '%'
	const res = await dbClient.query(qs, [searchValue])
	return res.rows[0].count
}


const search = async (searchTerm: string): Promise<Array<UserAccount>> => {

	const queryStr = `
		SELECT
		first_name,last_name,email,role,password
		FROM
		WHERE LOWER(r.name) LIKE  LOWER($1)
	`

	const searchValue = '%' + searchTerm + '%'
	const res = await dbClient.query(queryStr, [searchValue])

	return serialize(res.rows)
}


export default {
	getAll,
	deleteOne,
	create,
	getInfo,
	getCount,
	search,
	getSearchCount,
	userAccountIdExists,
	getInfoByEmail,
}
