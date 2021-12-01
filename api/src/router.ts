import { Router } from 'express'
import * as loginController from './userAccount/login'
const router = Router()

router.post('/login', loginController.postLogin)
router.post('/logout', loginController.logout)


import userAccountRouter from './userAccount/router'
router.use('/user-accounts', userAccountRouter)



export default router
