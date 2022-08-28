import express from 'express';
import upload from '../utils/uploadImage.js';
import protectedRoute from '../utils/protectedRoute.js';
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  updateBlog,
} from '../controllers/blogController.js';

const router = express.Router({ mergeParams: true });

router.get('/', getAllBlog);
router.post('/', protectedRoute, upload.single('image'), createBlog);
router.get('/:id', getBlog);
router.patch('/:id', protectedRoute, upload.single('image'), updateBlog);
router.delete('/:id', protectedRoute, deleteBlog);

export default router;
