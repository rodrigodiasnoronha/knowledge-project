import { Response, Request } from 'express';
import prisma from '../../services/prisma';
import mailer from '../../services/mailer';
import { generateJsonWebToken, encryptPassword } from '../utils';
import jwt from 'jsonwebtoken';

class ResetPassController {
    // This method just send the email to reset pass
    static store = async (request: Request, response: Response) => {
        const { email = '' } = request.body;

        const user = await prisma.user.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return response.status(404).json({
                code: 'error/user-not-found',
                message: 'User not found',
            });
        }

        /**
         * Its token we can find the user who would
         * like to reset your password
         *
         */
        const token = generateJsonWebToken(user.id);
        const url = `${process.env.FRONT_END_HOST}/reset_password?token=${token}`;

        try {
            // send mail with defined transport object
            await mailer.sendMail({
                from: '"Knowledge" <rodrigonoronha09@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Reset Password ✔', // Subject line
                text: 'Hi there', // plain text body
                html: `
                    <p>
                        If you would like to reset your password,

                        <a href="${url}" target="__blank">
                            click here
                        </a>
                    </p>

                    `, // html body
            });

            return response.status(204).json({});
        } catch (error) {
            return response.status(500).json({
                code: 'error/send-email',
                message:
                    'There was an erro while sending email to reset password',
                error,
            });
        }
    };

    static update = async (request: Request, response: Response) => {
        const { password = '', token = '' } = request.body;

        return jwt.verify(
            token,
            process.env.JWT_SECRET_APP || '',
            {},
            async (error: unknown, payload = { id: 0 }) => {
                if (error) {
                    return response.status(400).json({
                        code: 'error/invalid-token',
                        message: 'Invalid token',
                    });
                }

                let user = await prisma.user.findOne({
                    where: { id: payload.id },
                });

                if (!user) {
                    return response.status(404).json({
                        code: 'error/user-not-found',
                        message: 'User not found',
                    });
                }

                user = await prisma.user.update({
                    data: {
                        password: encryptPassword(password),
                    },
                    where: { id: payload.id },
                });

                const newToken = generateJsonWebToken(user.id);

                return response.json({ user, token: newToken });
            }
        );
    };
}

export default ResetPassController;
