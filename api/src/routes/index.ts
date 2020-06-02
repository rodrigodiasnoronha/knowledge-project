import { Router } from 'express';
import articleRoutes from './article.routes';
import tagRoutes from './tag.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);

routes.use('/auth', authRoutes);

routes.use('/articles', articleRoutes);

routes.use('/tags', tagRoutes);

export default routes;
