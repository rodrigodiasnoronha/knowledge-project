import { Router } from 'express';
import { loginValidator } from '../validators';
import { AppError } from '../errors/AppError';
import { LoginService } from '../services/LoginService';

const routes = Router();

routes.post('/login', loginValidator, async (request, response) => {
    try {
        const loginService = new LoginService();
        const { token, user } = await loginService.execute(request.body);

        return response.json({ token, user });
    } catch (err) {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json(err);
        }

        console.log(err);

        return response.status(500).json({ message: 'internal server error' });
    }
});

export default routes;
