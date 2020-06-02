import { Response, Request, NexttFunction } from 'express';

class AuthMiddleware {
    static authenticated = (
        request: Request,
        response: Response,
        next: NexttFunction
    ) => {};
}

export default AuthMiddleware;
