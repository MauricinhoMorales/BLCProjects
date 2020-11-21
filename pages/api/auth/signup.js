import boom from 'boom';
import UserService from '../../../services/user';
import { errorHandler } from '../../../utils/middlewares/errorHandlers';
import { validationHandler } from '../../../utils/middlewares/validationHandlers';
import { createUserSchema } from '../../../utils/models/user';

export default async function handler(req, res) {
  const { method } = req;
  const userService = new UserService();

  if (method === 'POST') {
    validationHandler(createUserSchema, 'body', req, res, async function (
      req,
      res
    ) {
      const { body: user } = req;
      try {
        const createdUserId = await userService.createUser({
          user,
        });
        res.status(200).json(createdUserId);
      } catch (err) {
        errorHandler(boom.internal(err), req, res);
      }
    });
  } else {
    errorHandler(
      boom.badRequest(
        new Error('This endpoints only supports POST requests'),
        req,
        res
      )
    );
  }
}
