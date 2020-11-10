import boom from 'boom';
import authenticated from '../../../../utils/auth/authenticatedWrapper';
import { validationHandler } from '../../../../utils/middlewares/validationHandlers';
import { errorHandler } from '../../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../../utils/middlewares/scopesValidationHandler';
import UserService from '../../../../services/user';

import {
  updateUserSchema,
  deleteUserSchema,
} from '../../../../utils/models/user';

export default authenticated(async function handler(req, res) {
  const userService = new UserService();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await userService.getUser({
          _id: req.query.id,
        });
        res.status(200).json(user);
      } catch (err) {
        errorHandler(boom.boomify(err, { statusCode: 500 }), req, res);
      }
      break;
    case 'PUT':
      validationHandler(updateUserSchema, 'query', req, res, function (
        req,
        res
      ) {
        scopeValidationHandler(['update:users'], req, res, async function (
          req,
          res
        ) {
          try {
            const updatedUserId = await userService.updateUser({
              id: req.query.id,
              user: req.body,
            });
            res.status(200).json(updatedUserId);
          } catch (err) {
            errorHandler(boom.boomify(err, { statusCode: 500 }), req, res);
          }
        });
      });
      break;
    case 'DELETE':
      validationHandler(deleteUserSchema, 'query', req, res, function (
        req,
        res
      ) {
        scopeValidationHandler(['delete:users'], req, res, async function (
          req,
          res
        ) {
          try {
            const deletedUserId = await userService.updateUser({
              _id: req.query.id,
            });
            res.status(200).json(deletedUserId);
          } catch (err) {
            errorHandler(boom.boomify(err, { statusCode: 500 }), req, res);
          }
        });
      });
      break;
    default:
      errorHandler(
        boom.badRequest(
          'This endpoint only supports GET, PUT and DELETE requests'
        ),
        req,
        res
      );
  }
});
