import { Request, Response, NextFunction } from 'express';

export class AuthMiddleware {
    async authenticated(
        request: Request,
        response: Response,
        next: NextFunction
    ) {}
}
