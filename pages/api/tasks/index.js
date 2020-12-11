import boom from 'boom';
import authenticated from '../../../utils/auth/authenticatedWrapper';
import { errorHandler } from '../../../utils/middlewares/errorHandlers';
import { validationHandler } from '../../../utils/middlewares/validationHandlers';
import scopeValidationHandler from '../../../utils/middlewares/scopesValidationHandler';
import { createTaskSchema } from '../../../utils/models/task';
import TaskService from '../../../services/task';

export default authenticated(async function (req, res) {
  const { method } = req;
  const taskService = new TaskService();

  if (method === 'GET') {
    scopeValidationHandler(['read:tasks'], req, res, async function (req, res) {
      const {
        query: { name, creator, dueDate, assignedTo },
      } = req;
      try {
        const tasks = await taskService.getTasks({
          name,
          assignedTo,
          dueDate,
          creator,
        });
        res.status(200).json(tasks);
      } catch (err) {
        errorHandler(boom.internal(err), req, res);
      }
    });
  } else if (method === 'POST') {
    validationHandler(createTaskSchema, 'body', req, res, function (req, res) {
      scopeValidationHandler(
        ['create:tasks'],
        req,
        res,
        async function (req, res) {
          const { body: task } = req;
          try {
            const createdTaskId = await taskService.createTask({ task });
            res.status(201).json(createdTaskId);
          } catch (err) {
            errorHandler(boom.internal(err), req, res);
          }
        }
      );
    });
  } else {
    errorHandler(boom.methodNotAllowed('Metodo no permitido'), req, res);
  }
});
