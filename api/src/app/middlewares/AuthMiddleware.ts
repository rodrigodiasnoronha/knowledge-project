import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class AuthMiddleware {
    static authenticated = (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        const { authorization } = request.headers;

        if (!authorization) {
            return response.status(401).json({
                code: 'error/authorization-not-found',
                message: 'Authorization not found',
            });
        }

        const [, token] = authorization.split(' ');

        if (!token) {
            return response.status(401).json({
                code: 'error/token-not-found',
                message: 'Token must be provided',
            });
        }

        return jwt.verify(
            token,
            process.env.JWT_SECRET_APP || '',
            (error, payload) => {
                if (error) {
                    return response.status(401).json({
                        code: 'error/invalid-token',
                        message: 'Invalid token',
                    });
                }

                return next();
            }
        );
    };
}

export default AuthMiddleware;
