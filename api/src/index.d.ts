import { DeviceStatus } from '@autonomy-power/types'
import * as express from 'express'
import { UserAccount } from './userAccount/types'
export { }
declare global {
	namespace NodeJS {
		interface Global {
			__rootdir__: string;
		}
	}

	interface SortOptions {
		order: 'ASC' | 'DESC';
		val: string;
	}

	interface SearchOptions {
		sort: SortOptions[];
		offset: number;
		limit: number;
	}

	namespace Express {
		interface User extends UserAccount {
			fake?: string
		}

		interface Request {
			user?: UserAccount,
			login: Function,
			logout: Function
		}
	}

}

