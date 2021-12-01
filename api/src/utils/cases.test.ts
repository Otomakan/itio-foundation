import { snakeToCamel, camelToSnake } from './cases'

const sampleSnake = 'hello_mother'
const sampleCamel = 'helloMother'

describe('utils cases', () => {
	it('cases snakeToCamel should return camel form of string', () => {
		const res = snakeToCamel(sampleSnake)
		expect(res).toStrictEqual(sampleCamel)
	})
	it('cases camelToSnake should return snake form of string', () => {
		const res = camelToSnake(sampleCamel)
		expect(res).toStrictEqual(sampleSnake)
	})
})