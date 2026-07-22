import express from "express";
import { 
  createNews, 
  deleteNews, 
  getAllNews, 
  getBreakingNews, 
  getNewsByCategory, 
  getTrendingNews, 
  updateNews,
  getSingleNews   // ✅ ADD THIS
} from "../controllers/newsController.js";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/', getAllNews)
router.get('/breaking', getBreakingNews)
router.get('/trending', getTrendingNews)
router.get('/category/:category', getNewsByCategory)
router.get('/:id', getSingleNews)  // ✅ ADD THIS ROUTE

router.post('/', protectRoute, adminRoute, createNews)
router.put('/:id', protectRoute, adminRoute, updateNews)
router.delete('/:id', protectRoute, adminRoute, deleteNews)

export default router