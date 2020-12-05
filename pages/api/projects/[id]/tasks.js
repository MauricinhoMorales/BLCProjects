import boom from 'boom';
import authenticated from '../../../../utils/auth/authenticatedWrapper';
import { errorHandler } from '../../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../../utils/middlewares/scopesValidationHandler';
import ProjectService from '../../../../services/project';
import {
  changeTaskSectionSchema,
  projectIdSchema,
  updateProjectSchema,
} from '../../../../utils/models/project';
import { validationHandler } from '../../../../utils/middlewares/validationHandlers';

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
              const {
                query: { id, sectionName },
              } = req;
              try {
                const sections = await projectService.getSectionTask({
                  id,
                  sectionName,
                });
                res.status(200).json(sections);
              } catch (err) {
                errorHandler(boom.internal(err), req, res);
              }
            }
          );
        }
      );
      break;
    case 'POST':
      validationHandler(
        projectIdSchema,
        'query',
        req,
        res,
        function (req, res) {
          scopeValidationHandler(
            ['update:projects'],
            req,
            res,
            async function (req, res) {
              const {
                query: { id },
              } = req;
              const {
                body: { sectionName, taskId },
              } = req;
              try {
                const updatedProjectId = await projectService.addTaskToSection({
                  id,
                  sectionName,
                  taskId,
                });
                res.status(200).json(updatedProjectId);
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
            changeTaskSectionSchema,
            'body',
            req,
            res,
            function (req, res) {
              scopeValidationHandler(
                ['update:projects'],
                req,
                res,
                async function (req, res) {
                  const {
                    query: { id },
                  } = req;
                  const { body: changeTaskSection } = req;
                  try {
                    const updatedProjectId = await projectService.changeTaskSection(
                      {
                        id,
                        changeTaskSection,
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
                query: { id, sectionName, taskId },
              } = req;
              try {
                const updatedProjectId = await projectService.deleteTaskFromSection(
                  {
                    id,
                    sectionName,
                    taskId,
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
      break;
    default:
      errorHandler(boom.methodNotAllowed(), req, res);
  }
});
