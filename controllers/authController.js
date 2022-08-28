import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import GlobalError from '../utils/gloablError.js';

const sendResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  user.password = undefined;
  user.role = undefined;
  res.status(statusCode).json({
    status: 'success',
    data: user,
    token,
  });
};

export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });
  sendResponse(user, 201, res);
});

export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new GlobalError('Please provide email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new GlobalError('Ivalid credential', 401));
  }

  sendResponse(user, 200, res);
});
