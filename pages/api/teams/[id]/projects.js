import boom from 'boom';
import authenticated from '../../../../utils/auth/authenticatedWrapper';
import { errorHandler } from '../../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../../utils/middlewares/scopesValidationHandler';
import TeamService from '../../../../services/teams';
import { memberSchema, teamIdSchema } from '../../../../utils/models/team';
import { validationHandler } from '../../../../utils/middlewares/validationHandlers';

export default authenticated(async function (req, res) {
  const { method } = req;
  const teamService = new TeamService();

  if (method === 'POST') {
    validationHandler(teamIdSchema, 'query', req, res, function (req, res) {
      scopeValidationHandler(
        ['update:teams'],
        req,
        res,
        async function (req, res) {
          const {
            query: { id },
          } = req;
          try {
            const updatedTeamId = await teamService.addProject({
              id,
              project: req.body,
            });
            res.status(200).json(updatedTeamId);
          } catch (err) {
            errorHandler(boom.internal(err), req, res);
          }
        }
      );
    });
  } else if (method === 'DELETE') {
    validationHandler(teamIdSchema, 'query', req, res, function (req, res) {
      scopeValidationHandler(
        ['update:teams'],
        req,
        res,
        async function (req, res) {
          const {
            query: { id, projectId },
          } = req;
          try {
            const updatedTeamId = await teamService.deleteProject({
              id,
              projectId,
            });
            res.status(200).json(updatedTeamId);
          } catch (err) {
            errorHandler(boom.internal(err), req, res);
          }
        }
      );
    });
  } else {
    errorHandler(boom.methodNotAllowed(), req, res);
  }
});
