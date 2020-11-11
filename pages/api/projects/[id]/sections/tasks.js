import boom from 'boom';
import authenticated from '../../../../../utils/auth/authenticatedWrapper';
import { errorHandler } from '../../../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../../../utils/middlewares/scopesValidationHandler';
import ProjectService from '../../../../../services/project';
import {
  changeTaskSectionSchema,
  projectIdSchema,
} from '../../../../../utils/models/project';
import { validationHandler } from '../../../../../utils/middlewares/validationHandlers';
import { tryGetPreviewData } from 'next/dist/next-server/server/api-utils';

export default authenticated(async function (req, res) {
  const { method } = req;
  const projectService = new ProjectService();
  switch (method) {
    /* case 'POST':
      validationHandler(projectIdSchema, "query", req, res, function(req,res){
        validationHandler
      })
      break; */
    case 'PUT':
      validationHandler(projectIdSchema, 'query', req, res, function (
        req,
        res
      ) {
        validationHandler(changeTaskSectionSchema, 'body', req, res, function (
          req,
          res
        ) {
          scopeValidationHandler(['update:projects'], req, res, async function (
            req,
            res
          ) {
            const {
              query: { id },
            } = req;
            const { body: changeTaskSection } = req;
            try {
              const updatedProjectId = await projectService.changeTaskSection({
                id,
                changeTaskSection,
              });
              res.status(200).json(updatedProjectId);
            } catch (err) {
              errorHandler(boom.internal(err), req, res);
            }
          });
        });
      });
      break;
    /* case 'DELETE':
      break; */
    default:
      errorHandler(boom.methodNotAllowed(), req, res);
  }
});
