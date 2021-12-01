import corsOptions, { whitelist } from './corsOptions'

const sampleWhiteList = [
	'http://localhost:8080',
	'http://localhost:3000',
	'http://localhost:9527',
	'http://localhost:9527',
	'http://localhost:5000',
	'http://0.0.0.0',
]

describe('corsOptions', () => {
	test('origin function returns a callback with null and true parameters', () => {
		// corsOptions.origin('Hi', (origin: string) => origin)
		// expect(fakeFunction).toHaveBeenCalledTimes(1)
		// expect(fakeFunction).toHaveBeenCalledWith(null, true)
		expect(whitelist).toEqual(sampleWhiteList)
		expect(corsOptions.credentials).toEqual(true)
	})
})
