const joi = require('joi');
const { userIdSchema } = require('./user');

const taskIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nameSchema = joi.string().min(2).max(50);
const descriptionSchema = joi.string().max(250);

const currentStatusSchema = joi.object({
  value: joi.string().max(50),
  color: joi.string().min(4).max(7),
});

const currentPrioritySchema = joi.object({
  value: joi.string().max(50),
  color: joi.string().min(4).max(7),
});

const progressSchema = joi.number().min(0).max(100);

const dueDateSchema = joi.object({
  start: joi.date(),
  end: joi.date(),
});

const projectSchema = joi.object({
  project_id: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  section_name: joi.string().max(50).required(),
});

const projectsSchema = joi.array().items(projectSchema);

const createTaskSchema = joi.object({
  name: nameSchema.required(),
  description: descriptionSchema.empty('').default(''),
  assignedTo: userIdSchema.empty(''),
  dueDate: dueDateSchema,
  projects: projectsSchema.required(),
  currentStatus: currentStatusSchema,
  currentPriority: currentPrioritySchema,
  progress: progressSchema,
});

const updateTaskSchema = joi.object({
  name: nameSchema,
  description: descriptionSchema,
  assignedTo: userIdSchema,
  dueDate: dueDateSchema,
  projects: projectsSchema,
  currentStatus: currentStatusSchema,
  currentPriority: currentPrioritySchema,
  progress: progressSchema,
});

module.exports = {
  taskIdSchema,
  createTaskSchema,
  updateTaskSchema,
};
