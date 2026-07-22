import express from 'express'
import { createPresenter, deletePresenter, getAllPresenters, updatePresenter } from '../controllers/presentersController.js'
import { protectRoute, adminRoute } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getAllPresenters)

router.post('/', protectRoute, adminRoute, createPresenter)

router.put('/:id', protectRoute, adminRoute, updatePresenter)

router.delete('/:id', protectRoute, adminRoute, deletePresenter)

export default router
