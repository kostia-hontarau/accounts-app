import Joi from "@hapi/joi";

export const accountValidationSchemas = {
  register: {
    body: Joi.object({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      city: Joi.string().required(),
      phone: Joi.string().required(),
      postalCode: Joi.string().required(),
    }),
  },
  update: {
    body: Joi.object({
      name: Joi.string(),
      surname: Joi.string(),
      email: Joi.string(),
      city: Joi.string(),
      phone: Joi.string(),
      postalCode: Joi.string(),
      oldPassword: Joi.string().required(),
      newPassword: Joi.string(),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};
