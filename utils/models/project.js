const joi = require('joi');
const { taskIdSchema } = require('./task');

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

const currentStatusSchema = joi.object({
  value: joi.string().max(50),
  color: joi.string().min(4).max(7),
});

const statusesSchema = joi.array().items(currentStatusSchema);

const currentPrioritySchema = joi.object({
  value: joi.string().max(50),
  color: joi.string().min(4).max(7),
});

const prioritiesSchema = joi.array().items(currentPrioritySchema);

const progressSchema = joi.number().min(0).max(100);
const sectionSchema = joi.object({
  name: joi.string().max(50),
  tasks: joi.array().items(taskIdSchema),
});

const sectionsSchema = joi.array().items(sectionSchema);

const changeTaskSectionSchema = joi.object({
  task_id: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  actual_section_name: joi.string().max(50).required(),
  new_section_name: joi.string().max(50).required(),
});

const createProjectSchema = joi.object({
  name: nameSchema.required(),
  description: descriptionSchema.required(),
  creator: creatorSchema.required(),
  currentStatus: currentStatusSchema.required(),
  currentPriority: currentPrioritySchema.required(),
  progress: progressSchema.required(),
  sections: sectionsSchema.required(),
  projectStatuses: statusesSchema.required(),
  projectPriorities: prioritiesSchema.required(),
});

const updateProjectSchema = joi.object({
  name: nameSchema,
  description: descriptionSchema,
  creator: creatorSchema,
  currentStatus: currentStatusSchema,
  currentPriority: currentPrioritySchema,
  progress: progressSchema,
  sections: sectionsSchema,
  projectStatuses: statusesSchema,
  projectPriorities: prioritiesSchema,
});

module.exports = {
  projectIdSchema,
  sectionSchema,
  creatorSchema,
  changeTaskSectionSchema,
  createProjectSchema,
  updateProjectSchema,
};
