import { Pool, PoolClient } from 'pg'

const POSTGRES_HOST = process.env.POSTGRES_HOST
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB = process.env.POSTGRES_DB
const POSTGRES_PORT = process.env.POSTGRES_PORT

const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`

const pool = new Pool({ connectionString })

let dbClient: PoolClient
pool.connect((error: Error, client: PoolClient) => {
	dbClient = client
})

pool.on('connect', () => {
	console.info('Connected to Database.')
})

pool.on('error', (e: Error) => {
	console.error('Connection to Database Fails:')
	console.error(e)
})

const connectDb = (): Promise<void> => {
	return new Promise((res) => {
		pool.connect((error: Error, client: PoolClient) => {
			dbClient = client
			res()
		})
	})
}

export {
	dbClient,
	connectDb
}


export default pool
