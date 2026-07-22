import express from "express";
import { createShow, deleteShow, getAllShows, updateShow } from "../controllers/showsController.js";
import { protectRoute, adminRoute } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/', getAllShows)

router.post('/', protectRoute, adminRoute, createShow)

router.put('/:id', protectRoute, adminRoute, updateShow)

router.delete('/:id', protectRoute, adminRoute, deleteShow)

export default router