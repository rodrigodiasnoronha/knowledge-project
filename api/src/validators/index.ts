import { celebrate, Joi, Segments } from 'celebrate';

export const createUserValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        admin: Joi.boolean(),
    }),
});

export const loginValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
});
