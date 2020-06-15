import { hashSync } from 'bcryptjs';

export const encryptPassword = (password: string) => hashSync(password, 8);
