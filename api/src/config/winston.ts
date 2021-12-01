const appRoot = require('app-root-path')
const winston = require('winston')



export const fileTransport = new winston.transports.File({
	level: 'info',
	filename: `${appRoot}/logs/app.log`,
	handleExceptions: true,
	json: true,
	maxsize: 5242880, // 5MB
	maxFiles: 5,
	colorize: false,
})

export const debugTransport = new winston.transports.Console({
	level: 'debug',
	handleExceptions: true,
	json: false,
	colorize: true,
})

export const errorTransport = new winston.transports.File({
	filename: `${appRoot}/logs/errors.log`
	, level: 'error'
})
export const myWinstonOptions = {
	transports: [
		new winston.transports.File({ filename: `${appRoot}/logs/combined.log` }),
		// debugTransport,
	],
	exitOnError: false,
}


export const winstonLogger = new winston.createLogger(myWinstonOptions)

winstonLogger.stream = {
	write: (message: string) => {
		winstonLogger.info(message)
	}
}

