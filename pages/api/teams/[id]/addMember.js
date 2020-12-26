import boom from 'boom';
import { errorHandler } from '../../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../../utils/middlewares/scopesValidationHandler';
import TeamService from '../../../../services/teams';
import { memberSchema, teamIdSchema } from '../../../../utils/models/team';
import { validationHandler } from '../../../../utils/middlewares/validationHandlers';

export default async function handler(req, res) {
  const { method } = req;
  const teamService = new TeamService();

  if (method === 'POST') {
    validationHandler(teamIdSchema, 'query', req, res, function (req, res) {
      validationHandler(
        memberSchema,
        'body',
        req,
        res,
        async function (req, res) {
          const {
            query: { id },
          } = req;
          try {
            const updatedTeamId = await teamService.addNewMember({
              id,
              member: req.body,
            });
            res.status(200).json(updatedTeamId);
          } catch (err) {
            errorHandler(boom.internal(err), req, res);
          }
        }
      );
    });
  } else {
    errorHandler(
      boom.methodNotAllowed('Solo se permiten solicitudes POST'),
      req,
      res
    );
  }
}
