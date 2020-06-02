import { Router } from 'express';
import AuthController from '../app/controllers/AuthController';
import ResetPassController from '../app/controllers/ResetPasswordController';
import * as validators from '../app/validators';

const routes = Router();

routes.route('/login').post(validators.login, AuthController.store);

routes
    .route('/reset_password')
    .post(validators.resetPass, ResetPassController.store)
    .put(validators.resetPassUpdate, ResetPassController.update);

export default routes;
