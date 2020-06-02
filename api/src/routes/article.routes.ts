import { Router } from 'express';
import ArticleController from '../app/controllers/ArticleController';
import AuthMiddleware from '../app/middlewares/AuthMiddleware';

const routes = Router();

routes.route('/').get(AuthMiddleware.authenticated, ArticleController.index);

export default routes;
