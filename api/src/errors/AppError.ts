export class AppError extends Error {
    public statusCode: number;
    public code: string;
    public message: string;

    constructor(message: string, code: string, statusCode: number) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.code = code;
    }
}
