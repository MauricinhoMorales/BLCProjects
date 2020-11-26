import boom from 'boom';
import bcrypt from 'bcrypt';
import UserService from '../../../../services/user';
import { errorHandler } from '../../../../utils/middlewares/errorHandlers';

const userService = new UserService();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const {
      query: { recoveryCode },
    } = req;
    const user = await userService.getUsers({ recoveryCode });
    if (!user.length) {
      return errorHandler(boom.badData('El usuario no existe'), req, res);
    }
    if (Date.now() > user[0].recoveryCodeExpires) {
      return errorHandler(
        boom.badData('Link de recuperacion invalido'),
        req,
        res
      );
    }
    return res.status(200).end();
  } else if (method === 'POST') {
    const {
      query: { recoveryCode },
    } = req;
    const { password } = req.body;
    try {
      const user = await userService.getUsers({ recoveryCode });
      if (!user.length) {
        return errorHandler(boom.badData('El usuario no existe'), req, res);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUserId = await userService.updateUser({
        id: user[0]._id,
        user: { password: hashedPassword },
      });
      return res.status(200).json({
        message: 'Recovery Completed',
        updatedUserId,
      });
    } catch (err) {
      return errorHandler(boom.internal(err), req, res);
    }
  } else {
    return errorHandler(
      boom.methodNotAllowed(
        'This endpoint only supports GET and POST requests'
      ),
      req,
      res
    );
  }
}
