import boom from 'boom';
import authenticated from '../../../../utils/auth/authenticatedWrapper';
import { validationHandler } from '../../../../utils/middlewares/validationHandlers';
import { errorHandler } from '../../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../../utils/middlewares/scopesValidationHandler';
import TeamService from '../../../../services/teams';

import { updateTeamSchema, teamIdSchema } from '../../../../utils/models/team';

export default authenticated(async function handler(req, res) {
  const teamService = new TeamService();

  const { method } = req;

  switch (method) {
    case 'GET':
      validationHandler(teamIdSchema, 'query', req, res, function (req, res) {
        scopeValidationHandler(['read:teams'], req, res, async function (
          req,
          res
        ) {
          try {
            const team = await teamService.getTeam({
              id: req.query.id,
            });
            res.status(200).json(team);
          } catch (err) {
            errorHandler(boom.internal(err), req, res);
          }
        });
      });
      break;
    case 'PUT':
      validationHandler(teamIdSchema, 'query', req, res, function (req, res) {
        validationHandler(updateTeamSchema, 'body', req, res, function (
          req,
          res
        ) {
          scopeValidationHandler(['update:teams'], req, res, async function (
            req,
            res
          ) {
            try {
              const updatedTeamId = await teamService.updateTeam({
                id: req.query.id,
                team: req.body,
              });
              res.status(200).json(updatedTeamId);
            } catch (err) {
              errorHandler(boom.internal(err), req, res);
            }
          });
        });
      });
      break;
    case 'DELETE':
      validationHandler(teamIdSchema, 'query', req, res, function (req, res) {
        scopeValidationHandler(['delete:teams'], req, res, async function (
          req,
          res
        ) {
          const {
            query: { id },
          } = req;
          try {
            const deletedTeamId = await teamService.deleteTeam({
              id,
            });
            res.status(200).json(deletedTeamId);
          } catch (err) {
            errorHandler(boom.internal(err), req, res);
          }
        });
      });
      break;
    default:
      errorHandler(boom.methodNotAllowed(), req, res);
  }
});
