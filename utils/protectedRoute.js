import { promisify } from 'util';
import GlobalError from './gloablError.js';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';

const protectedRoute = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    return (token = req.headers.authorization.split(' ')[1]);
  }
  if (!token) {
    return next(new GlobalError('Please login to get access', 401));
  }
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  const checkUser = await User.findById(decodedToken.id);
  if (!checkUser) {
    return next(new GlobalError('Please login to get access', 401));
  }
  if (checkUser.isPasswordUpdated(decodedToken.iat)) {
    return next(
      new GlobalError(
        'Password recently changed, Please relogin to get access',
        401
      )
    );
  }
  req.user = checkUser;
  next();
});

export default protectedRoute;
