import express from 'express';
import protectedRoute from '../utils/protectedRoute.js';
import upload from '../utils/uploadImage.js';
import {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = express.Router({ mergeParams: true });

router.get('/', getAllProjects);
router.post('/', protectedRoute, upload.single('image'), createProject);
router.get('/id', getProject);
router.patch('/id', protectedRoute, upload.single('image'), updateProject);
router.delete('/id', protectedRoute, deleteProject);

export default router;
