import express from 'express';
import blogRoutes from './blog.js';
import projectRoutes from './project.js';
import protectedRoute from '../utils/protectedRoute.js';
import {
  createTag,
  deleteTag,
  getAllTags,
  getTag,
  updateTag,
} from '../controllers/tagController.js';

const router = express.Router();

router.get('/', getAllTags);
router.post('/', protectedRoute, createTag);
router.get('/:id', getTag);
router.patch('/:id', protectedRoute, updateTag);
router.delete('/:id', protectedRoute, deleteTag);
router.use('/:tagId/blog', blogRoutes);
router.use('/:tagId/projects', projectRoutes);

export default router;
