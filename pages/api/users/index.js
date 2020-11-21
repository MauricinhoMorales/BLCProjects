import boom from 'boom';
import authenticated from '../../../utils/auth/authenticatedWrapper';
import { errorHandler } from '../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../utils/middlewares/scopesValidationHandler';
import UserService from '../../../services/user';

export default authenticated(async function (req, res) {
  const { method } = req;
  const userService = new UserService();

  if (method === 'GET') {
    const {
      query: { email, name, activatedAccount, activationCode },
    } = req;

    scopeValidationHandler(['read:users'], req, res, async function (req, res) {
      try {
        const users = await userService.getUsers({ email });
        res.status(200).json(users);
      } catch (err) {
        errorHandler(boom.internal(err), req, res);
      }
    });
  } else {
    errorHandler(boom.methodNotAllowed(), req, res);
  }
});
