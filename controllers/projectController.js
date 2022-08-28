import Project from '../models/Project.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../utils/handleFactory.js';

export const getAllProjects = getAll(Project);
export const getProject = getOne(Project, { path: 'tags' });
export const createProject = createOne(Project);
export const updateProject = updateOne(Project);
export const deleteProject = deleteOne(Project);
