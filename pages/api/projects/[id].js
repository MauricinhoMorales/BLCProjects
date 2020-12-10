import boom from 'boom';
import authenticated from '../../../utils/auth/authenticatedWrapper';
import { validationHandler } from '../../../utils/middlewares/validationHandlers';
import { errorHandler } from '../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../utils/middlewares/scopesValidationHandler';
import ProjectService from '../../../services/project';

import {
  updateProjectSchema,
  projectIdSchema,
} from '../../../utils/models/project';

export default authenticated(async function (req, res) {
  const { method } = req;
  const projectService = new ProjectService();

  switch (method) {
    case 'GET':
      validationHandler(
        projectIdSchema,
        'query',
        req,
        res,
        function (req, res) {
          scopeValidationHandler(
            ['read:projects'],
            req,
            res,
            async function (req, res) {
              try {
                const project = await projectService.getProject({
                  id: req.query.id,
                });
                res.status(200).json(project);
              } catch (err) {
                errorHandler(boom.internal(err), req, res);
              }
            }
          );
        }
      );
      break;
    case 'PUT':
      validationHandler(
        projectIdSchema,
        'query',
        req,
        res,
        function (req, res) {
          validationHandler(
            updateProjectSchema,
            'body',
            req,
            res,
            function (req, res) {
              scopeValidationHandler(
                ['update:projects'],
                req,
                res,
                async function (req, res) {
                  try {
                    const updatedProjectId = await projectService.updateProject(
                      {
                        id: req.query.id,
                        project: req.body,
                      }
                    );
                    res.status(200).json(updatedProjectId);
                  } catch (err) {
                    errorHandler(boom.internal(err), req, res);
                  }
                }
              );
            }
          );
        }
      );
      break;
    case 'DELETE':
      validationHandler(
        projectIdSchema,
        'query',
        req,
        res,
        function (req, res) {
          scopeValidationHandler(
            ['delete:projects'],
            req,
            res,
            async function (req, res) {
              const {
                query: { id },
              } = req;
              try {
                const deletedProjectId = await projectService.deleteProject({
                  id,
                });
                res.status(200).json(deletedProjectId);
              } catch (err) {
                errorHandler(boom.internal(err), req, res);
              }
            }
          );
        }
      );
      break;
    default:
      errorHandler(boom.methodNotAllowed(), req, res);
  }
});
