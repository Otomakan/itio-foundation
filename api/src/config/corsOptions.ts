import {CorsOptions} from 'cors'
export const whitelist = [
	'http://localhost:8080',
	'http://localhost:3000',
	'http://localhost:9527',
	'http://localhost:9527',
	'http://localhost:5000',
	'http://0.0.0.0',
]

export default {
	origin: function (origin: string, callback: any) {
		// this is allowing all cors this is bad
		return callback(null, true)
	},
	credentials: true,
} as CorsOptions
