import { Request, Response } from 'express';

class ArticleController {
    static index = async (request: Request, response: Response) => {
        return response.json('authenticated');
    };

    static store = async (request: Request, response: Response) => {};

    static show = async (request: Request, response: Response) => {};

    static destroy = async (request: Request, response: Response) => {};

    static update = async (request: Request, response: Response) => {};
}

export default ArticleController;
