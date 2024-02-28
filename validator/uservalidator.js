import Joi from 'joi';

export const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    query: Joi.string().required(),
});



