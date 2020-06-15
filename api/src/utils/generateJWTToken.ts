import { sign } from 'jsonwebtoken';
import authConfig from '../config/authConfig';

export const generateToken = (id: number) =>
    sign({ id }, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expiresIn,
    });
