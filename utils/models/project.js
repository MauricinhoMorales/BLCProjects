const joi = require('joi');

const projectIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nameSchema = joi.string().min(2).max(50);
const descriptionSchema = joi.string().max(250);

const creatorSchema = joi.object({
  creator_id: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  isTeam: joi.boolean().required(),
});

const statusSchema = joi
  .string()
  .valid('Sin Empezar', 'En Progreso', 'Retrasado', 'Completado');

const progressSchema = joi.number().min(0).max(100);
const sectionSchema = joi.object({
  name: joi.string().max(50),
  tasks: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)),
});

const sectionsSchema = joi.array().items(sectionSchema);

const createProjectSchema = joi.object({
  name: nameSchema.required(),
  description: descriptionSchema.required(),
  creator: creatorSchema.required(),
  status: statusSchema.required(),
  progress: progressSchema.required(),
  sections: sectionsSchema.required(),
});

const updateProjectSchema = joi.object({
  name: nameSchema,
  description: descriptionSchema,
  creator: creatorSchema,
  status: statusSchema,
  progress: progressSchema,
  sections: sectionsSchema,
});

module.exports = {
  projectIdSchema,
  sectionSchema,
  creatorSchema,
  createProjectSchema,
  updateProjectSchema,
};
