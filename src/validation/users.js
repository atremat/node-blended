import Joi from 'joi';

export const registerValidationSchema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  email: Joi.string().email().min(3).max(32).required(),
  password: Joi.string().min(6).max(16).required(),
});

export const loginValidationSchema = Joi.object({
  email: Joi.string().email().min(3).max(32).required(),
  password: Joi.string().min(6).max(16).required(),
});
