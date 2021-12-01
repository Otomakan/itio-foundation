import { searchQueryBuilder } from './queryBuilder'
import {
	buildSearchOptions,
	buildSortOptions,
} from '../../test/utils/generate'

const sampleTableName = ''
const sampleSortOptions = buildSortOptions()
const sampleSortOptionsDesc = buildSortOptions('DESC')
const sampleSearchOptions = buildSearchOptions([sampleSortOptions], 0, 1)
const sampleColumnName = ['', '']

describe('db queryBuilder', () => {
	beforeAll(() => {
		jest.clearAllMocks()
	})
	it('searchQueryBuilder returns an object that has queryOptions and values', () => {
		const searchQueryBuilderResponse = searchQueryBuilder(
			sampleTableName,
			sampleColumnName,
			buildSearchOptions([sampleSortOptions], 0, 1)
		)
		expect(searchQueryBuilderResponse).toStrictEqual({
			queryOptions: 'ORDER BY  ASC  NULLS LAST LIMIT $1	OFFSET $2',
			values: [1, 0],
		})
	})
	it('searchQueryBuilder returns an object that has queryOptions and values', () => {
		const searchQueryBuilderResponse = searchQueryBuilder(
			sampleTableName,
			sampleColumnName,
			buildSearchOptions([sampleSortOptionsDesc], 0, 1)
		)
		expect(searchQueryBuilderResponse).toStrictEqual({
			queryOptions: 'ORDER BY  DESC  NULLS LAST LIMIT $1	OFFSET $2',
			values: [1, 0],
		})
	})
	it('searchQueryBuilder should throw an error when column is invalid', () => {
		const sampleFalseColumnName = ['De']
		expect(() =>
			searchQueryBuilder(
				sampleTableName,
				sampleFalseColumnName,
				sampleSearchOptions
			)
		).toThrow(new Error(' is not a column'))
	})
	it('searchQueryBuilder when options.sort.length is 0', () => {
		const searchQueryBuilderResponse = searchQueryBuilder(
			sampleTableName,
			sampleColumnName,
			sampleSearchOptions
		)
		expect(searchQueryBuilderResponse).toStrictEqual({
			queryOptions: 'ORDER BY  ASC  NULLS LAST LIMIT $1	OFFSET $2',
			values: [1, 0],
		})
	})
	it('searchQueryBuilder when options.sort.length is 0', () => {
		const searchQueryBuilderResponse = searchQueryBuilder(
			sampleTableName,
			sampleColumnName,
			sampleSearchOptions
		)
		expect(searchQueryBuilderResponse).toStrictEqual({
			'queryOptions': 'ORDER BY  ASC  NULLS LAST LIMIT $1	OFFSET $2',
			'values': [
				1,
				0,
			],
		}
		)
	})
})
