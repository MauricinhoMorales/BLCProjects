const joi = require('joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nameSchema = joi.string().min(2).max(20);
const emailSchema = joi.string();
const passwordSchema = joi.string().max(30);
const isAdminSchema = joi.boolean();

const createUserSchema = joi.object({
  firstName: nameSchema.required(),
  lastName: nameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
  repeatPassword: joi.ref('password'),
  isAdmin: isAdminSchema.required(),
});

const updateUserSchema = joi.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  repeatPassword: joi.ref('password'),
  isAdmin: isAdminSchema,
});

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
};
