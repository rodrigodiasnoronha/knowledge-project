import { celebrate, Joi, Segments } from 'celebrate';

export const createUser = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
});

export const login = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
});

export const resetPass = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
});

export const resetPassUpdate = celebrate({
    [Segments.BODY]: Joi.object().keys({
        password: Joi.string().min(6).required(),
        token: Joi.string().required(),
    }),
});
