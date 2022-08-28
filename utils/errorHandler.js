import GlobalError from './gloablError.js';

const validationError = (err) => {
  const obj = Object.values(err.errors).map((e) => e.message);
  return new GlobalError(`${obj.join('. ')}`, 400);
};
const castErrorDatabase = (err) => {
  return new GlobalError(`Invalid ${err.path}: ${err.value}`, 400);
};
const duplicateFields = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  return new GlobalError(
    `Duplicate field value: ${value}. Please use another value!`,
    400
  );
};
const errorJWT = () => {
  return new GlobalError(`Invalid token. Please relogin to get access!`, 401);
};
const tokenExpired = () => {
  return new GlobalError(`Token expired. Please relogin to get access`, 401);
};
const errorProduction = (err, req, res) => {
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
};
const errorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'production') {
    let error = err;
    if (error.name === 'ValidationError') error = validationError(error);
    if (error.name === 'CastError') error = castErrorDatabase(error);
    if (error.code === 11000) return (error = duplicateFields(error));
    if (error.name === 'JsonWebTokenError') return (error = errorJWT());
    if (error.name === 'TokenExpiredError') return (error = tokenExpired());
    return errorProduction(error, req, res);
  }
  errorDev(err, req, res);
};

export default errorHandler;
