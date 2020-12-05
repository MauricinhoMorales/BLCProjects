import boom from 'boom';
import authenticated from '../../../../utils/auth/authenticatedWrapper';
import { errorHandler } from '../../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../../utils/middlewares/scopesValidationHandler';
import ProjectService from '../../../../services/project';
import {
  sectionSchema,
  projectIdSchema,
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
                query: { id },
              } = req;
              try {
                const sections = await projectService.getProjectSections({
                  id,
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
          validationHandler(
            sectionSchema,
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
                  const { body: section } = req;
                  try {
                    const updatedProjectId = await projectService.addNewSection(
                      {
                        id,
                        section,
                      }
                    );
                    res.status(201).json(updatedProjectId);
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
    case 'PUT':
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
                body: { oldSectionName, newSectionName },
              } = req;
              try {
                const updatedProjectId = await projectService.changeSectionName(
                  {
                    id,
                    oldSectionName,
                    newSectionName,
                  }
                );
                res.status(201).json(updatedProjectId);
              } catch (err) {
                errorHandler(boom.internal(err), req, res);
              }
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
                query: { id, name },
              } = req;
              try {
                const updatedProjectId = await projectService.deleteSection({
                  id,
                  name,
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
    default:
      errorHandler(boom.methodNotAllowed(), req, res);
  }
});
