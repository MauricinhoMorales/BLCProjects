const joi = require('joi');
const { userIdSchema } = require('./user');

const teamIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nameSchema = joi.string().min(2).max(50);
const memberSchema = joi.object({
  member_id: userIdSchema.required(),
  permissions: joi.string().required(),
  role: joi.string().min(3).max(30).required(),
});

const colorSchema = joi.string().min(4).max(7);
const membersSchema = joi.array().items(memberSchema);
const areaConocimientoSchema = joi.string().min(3).max(50);
const projectsSchema = joi.array().items(userIdSchema);

const createTeamSchema = joi.object({
  name: nameSchema.required(),
  creator: userIdSchema.required(),
  color: colorSchema.required(),
  members: membersSchema.required(),
  areaConocimiento: areaConocimientoSchema.required(),
  projects: projectsSchema.default([]),
});

const updateTeamSchema = joi.object({
  name: nameSchema,
  creator: userIdSchema,
  color: colorSchema,
  members: membersSchema,
  areaConocimiento: areaConocimientoSchema,
  projects: projectsSchema,
});

module.exports = {
  teamIdSchema,
  memberSchema,
  createTeamSchema,
  updateTeamSchema,
};
