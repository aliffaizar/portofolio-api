import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import connectDatabase from './utils/database.js';
import authRoutes from './routes/auth.js';
import errorHandler from './utils/errorHandler.js';
import GlobalError from './utils/gloablError.js';
import blogRoutes from './routes/blog.js';
import projectRoutes from './routes/project.js';
import tagRouter from './routes/tag.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static('./public'));

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tags', tagRouter);

app.all('*', (req, res, next) => {
  next(new GlobalError(`Can not ${req.method} to ${req.originalUrl} `, 404));
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDatabase();
  console.log(`server is runnig at port ${port}`);
});
