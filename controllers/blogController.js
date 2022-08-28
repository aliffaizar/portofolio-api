import Blog from '../models/Blog.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../utils/handleFactory.js';

export const getAllBlog = getAll(Blog);
export const getBlog = getOne(Blog, { path: 'tags' });
export const createBlog = createOne(Blog);
export const updateBlog = updateOne(Blog);
export const deleteBlog = deleteOne(Blog);
