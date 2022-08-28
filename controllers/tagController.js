import Tag from '../models/Tag.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../utils/handleFactory.js';

export const getAllTags = getAll(Tag);
export const getTag = getOne(Tag);
export const createTag = createOne(Tag);
export const updateTag = updateOne(Tag);
export const deleteTag = deleteOne(Tag);
