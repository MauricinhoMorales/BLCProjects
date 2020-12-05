import boom from 'boom';
import authenticated from '../../../utils/auth/authenticatedWrapper';
import { validationHandler } from '../../../utils/middlewares/validationHandlers';
import { errorHandler } from '../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../utils/middlewares/scopesValidationHandler';
import TaskService from '../../../services/task';

import {
  updateTaskSchemaSchema,
  taskIdSchema,
  updateTaskSchema,
} from '../../../utils/models/task';

export default authenticated(async function (req, res) {
  const { method } = req;
  const taskService = new TaskService();
  switch (method) {
    case 'GET':
      validationHandler(taskIdSchema, 'query', req, res, function (req, res) {
        scopeValidationHandler(
          ['read:tasks'],
          req,
          res,
          async function (req, res) {
            const {
              query: { id },
            } = req;
            try {
              const task = await taskService.getTask({ id });
              res.status(200).json(task);
            } catch (err) {
              errorHandler(boom.internal(err), req, res);
            }
          }
        );
      });
      break;
    case 'PUT':
      validationHandler(taskIdSchema, 'query', req, res, function (req, res) {
        validationHandler(
          updateTaskSchema,
          'body',
          req,
          res,
          function (req, res) {
            scopeValidationHandler(
              ['update:tasks'],
              req,
              res,
              async function (req, res) {
                const {
                  query: { id },
                } = req;
                const { body: task } = req;
                try {
                  const updatedTaskId = await taskService.updateTask({
                    id,
                    task,
                  });
                  res.status(200).json(updatedTaskId);
                } catch (err) {
                  errorHandler(boom.internal(err), req, res);
                }
              }
            );
          }
        );
      });
      break;
    case 'DELETE':
      validationHandler(taskIdSchema, 'query', req, res, function (req, res) {
        scopeValidationHandler(
          ['delete:tasks'],
          req,
          res,
          async function (req, res) {
            const {
              query: { id },
            } = req;
            try {
              const deletedTaskId = await taskService.deleteTask({ id });
              res.status(200).json(deletedTaskId);
            } catch (err) {
              errorHandler(boom.internal(err), req, res);
            }
          }
        );
      });
      break;
    default:
      errorHandler(boom.methodNotAllowed(), req, res);
  }
});
