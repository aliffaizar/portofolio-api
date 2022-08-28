import asyncHandler from './asyncHandler.js';
import GlobalError from './gloablError.js';

export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    console.log(req.file);
    let filters = {};
    if (req.params.tagId) filters = { tags: req.params.tagId };
    console.log(filters);
    const data = await Model.find(filters);
    console.log('someting going on');
    res.status(200).json({
      status: 'success',
      result: data.length,
      data,
    });
  });

export const getOne = (Model, populateOption) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOption) query = query.populate(populateOption);
    const data = await query;
    if (!data) return next(new GlobalError('Not found!', 400));
    res.status(200).json({
      status: 'success',
      data,
    });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    if (req.file) {
      req.body = { ...req.body, image: `images/${req.file.filename}` };
    }
    const data = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data,
    });
  });

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return next(new GlobalError('Not found', 400));
    res.status(200).json({
      message: 'success',
      data,
    });
  });

export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) return next(new GlobalError('Not found', 404));
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
