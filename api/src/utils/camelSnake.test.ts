import { camelToSnake, snakeToCamel } from './camelSnake'

const sampleCamelString = 'helloMother'
const sampleSnakeString = 'hello_mother'

describe('utils camelSnake', () => {
	it('camelToSnake', () => {
		const res = camelToSnake(sampleCamelString)
		expect(res).toBe(sampleSnakeString)
	})
	it('snakeToCamel', () => {
		const res = snakeToCamel(sampleSnakeString)
		expect(res).toBe(sampleCamelString)
	})
})