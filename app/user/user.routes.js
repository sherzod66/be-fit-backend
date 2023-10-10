import { Router } from 'express'
import { getUserProfile } from './user.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const userRouter = Router()

userRouter.route('/profile').get(protect, getUserProfile)

export default userRouter
