import express from "express";
import { 
  createBlog,        // ✅ Singular
  deleteBlog,        // ✅ Singular
  getAllBlog,        // ✅ Singular
  updateBlog,        // ✅ Singular
  getSingleBlog      // ✅ Singular
} from "../controllers/BlogsController.js";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/', getAllBlog)
router.get('/:id', getSingleBlog)  
router.post('/', protectRoute, adminRoute, createBlog)
router.put('/:id', protectRoute, adminRoute, updateBlog)
router.delete('/:id', protectRoute, adminRoute, deleteBlog)

export default router