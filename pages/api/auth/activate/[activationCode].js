import boom from 'boom';
import UserService from '../../../../services/user';
import { errorHandler } from '../../../../utils/middlewares/errorHandlers';

const userService = new UserService();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const {
      query: { activationCode },
    } = req;
    if (!activationCode) {
      errorHandler(boom.unauthorized('ActivationCode es requerido'), req, res);
    }
    try {
      const user = await userService.getUsers({ activationCode });
      if (!user.length) {
        errorHandler(boom.badData('El usuario no existe'), req, res);
        return;
      }
      if (Date.now() > user[0].activationCodeExpires) {
        errorHandler(boom.badData('Link de activacion invalido'), req, res);
        return;
      }
      const updatedUserId = await userService.updateUser({
        id: user[0]._id,
        user: { accountActivated: true },
      });
      res.status(200).json({
        message: 'Activation Completed',
        updatedUserId,
      });
    } catch (err) {
      errorHandler(boom.internal(err), req, res);
    }
  } else {
    errorHandler(
      boom.methodNotAllowed('This endpoint only supports GET requests'),
      req,
      res
    );
  }
}
