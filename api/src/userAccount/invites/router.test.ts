// import request from 'supertest'
// import express from 'express'
// import authorizer from '../../utils/authorizer'
// import userAccountInviteRouter from './router'
// import { sendInviteEmail } from './service'

// jest.mock('../../utils/authorizer')
// jest.mock('./service')
// const userAuthorizerMock = authorizer as jest.Mock
// const sendInviteEmailMock = sendInviteEmail as jest.Mock
// const router = express()
// router.use('/', userAccountInviteRouter)

// describe('userAccount/invites/router.ts', () => {
// 	describe('userAccount invites', () => {
// 		it('post should respond to /', async () => {
// 			userAuthorizerMock.mockResolvedValue(Promise.resolve())
// 			sendInviteEmailMock.mockResolvedValue(true)
// 			const res = await request(router).post('/sampleuserid/invites/sampletemplate')
// 			expect(res.body).toBe(true)
// 			expect(res.status).toBe(200)
// 		})
// 	})
// 	describe('userAccount invites throws error', () => {
// 		it('post should respond with a 500 when invite email failsto /', async () => {
// 			userAuthorizerMock.mockResolvedValue(Promise.resolve())
// 			sendInviteEmailMock.mockRejectedValue(new Error())
// 			const res = await request(router).post('/sampleuserid/invites/sampletemplate')
// 			expect(res.status).toBe(500)
// 		})
// 	})
// })