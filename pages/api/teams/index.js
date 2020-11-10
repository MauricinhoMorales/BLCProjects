import boom from 'boom';
import authenticated from '../../../utils/auth/authenticatedWrapper';
import { errorHandler } from '../../../utils/middlewares/errorHandlers';
import { validationHandler } from '../../../utils/middlewares/validationHandlers';
import scopeValidationHandler from '../../../utils/middlewares/scopesValidationHandler';
import { createTeamSchema } from '../../../utils/models/team';
import TeamService from '../../../services/teams';

export default authenticated(async function (req, res) {
  const { method } = req;
  const teamService = new TeamService();

  if (method === 'GET') {
    const {
      query: { name, creator, areaConocimiento },
    } = req;

    scopeValidationHandler(['read:teams'], req, res, async function (req, res) {
      try {
        const teams = await teamService.getTeams({
          name,
          creator,
          areaConocimiento,
        });
        res.status(200).json(teams);
      } catch (err) {
        errorHandler(boom.internal(err), req, res);
      }
    });
  } else if (method === 'POST') {
    validationHandler(createTeamSchema, 'body', req, res, function (req, res) {
      scopeValidationHandler(['create:teams'], req, res, async function (
        req,
        res
      ) {
        try {
          const createdTeamId = await teamService.createTeam({
            team: req.body,
          });
          res.status(201).json(createdTeamId);
        } catch (err) {
          errorHandler(boom.internal(err), req, res);
        }
      });
    });
  } else {
    errorHandler(boom.methodNotAllowed(), req, res);
  }
});
