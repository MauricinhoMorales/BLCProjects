import boom from 'boom';
import authenticated from '../../../utils/auth/authenticatedWrapper';
import { errorHandler } from '../../../utils/middlewares/errorHandlers';
import { validationHandler } from '../../../utils/middlewares/validationHandlers';
import scopeValidationHandler from '../../../utils/middlewares/scopesValidationHandler';
import { createProjectSchema } from '../../../utils/models/project';
import ProjectService from '../../../services/project';

export default authenticated(async function (req, res) {
  debugger;
  const { method } = req;
  const projectService = new ProjectService();

  if (method === 'GET') {
    const {
      query: { name, creator, status },
    } = req;

    scopeValidationHandler(
      ['read:projects'],
      req,
      res,
      async function (req, res) {
        try {
          const projects = await projectService.getProjects({
            name,
            creator,
            status,
          });
          res.status(200).json(projects);
        } catch (err) {
          errorHandler(boom.internal(err), req, res);
        }
      }
    );
  } else if (method === 'POST') {
    validationHandler(
      createProjectSchema,
      'body',
      req,
      res,
      function (req, res) {
        scopeValidationHandler(
          ['create:projects'],
          req,
          res,
          async function (req, res) {
            const { body: project } = req;
            try {
              const createdProjectId = await projectService.createProject({
                project,
              });
              res.status(201).json(createdProjectId);
            } catch (err) {
              errorHandler(boom.internal(err), req, res);
            }
          }
        );
      }
    );
  } else {
    errorHandler(boom.methodNotAllowed(), req, res);
  }
});
