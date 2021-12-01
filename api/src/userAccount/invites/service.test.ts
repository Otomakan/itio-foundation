// import { sendInviteEmail } from './service'
// import { buildUser, getString } from '../../../test/utils/generate'
// import {v4 as uuid} from 'uuid'

// jest.mock('uuid')
// jest.mock('./generateEmail/index')
// jest.mock('@autonomy-power/dao')
// jest.mock('../../email/sendMail')
// const uuidMock = uuid as jest.Mock
// const userAccountDaoMock = jest.requireMock('@autonomy-power/dao').userAccount
// const sampleUser = buildUser()
// const sampleUserAccountId = getString()
// const sampleInviteEmailDefault = 'default'

// describe('userAccount service', () => {
// 	it('sendInviteEmail should return true', async() => {
// 		userAccountDaoMock.getInfo.mockResolvedValue(sampleUser)
// 		uuidMock.mockResolvedValue(getString())
// 		const res = await sendInviteEmail(sampleUserAccountId, sampleInviteEmailDefault)
// 		expect(res).toBe(true)
// 	})
// })