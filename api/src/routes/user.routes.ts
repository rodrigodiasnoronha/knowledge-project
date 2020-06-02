import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import * as validators from '../app/validators';

const routes = Router();

routes
    .route('/')
    .post(validators.createUser, UserController.store)
    .get(UserController.index);

export default routes;
