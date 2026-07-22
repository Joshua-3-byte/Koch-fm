import express from 'express'
import { adminLogin, adminLogout, adminSignup, refreshToken, getProfile } from '../controllers/authController.js'
import { protectRoute } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup', adminSignup) 

router.post('/login', adminLogin)

router.post('/logout', adminLogout)

router.post('/refresh-token', refreshToken)

router.get("/profile", protectRoute, getProfile);


export default router
