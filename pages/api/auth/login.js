import { config } from '../../../config/index';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import boom from 'boom';
import ApiKeysService from '../../../services/apiKeys';
import UserService from '../../../services/user';
import { errorHandler } from '../../../utils/middlewares/errorHandlers';

const apiKeysService = new ApiKeysService();
const userService = new UserService();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { apiKeyToken, email, password } = req.body;
    if (!apiKeyToken) {
      return errorHandler(
        boom.unauthorized('ApiKeyToken es requerido'),
        req,
        res
      );
    }
    if (!email || !password) {
      return errorHandler(
        boom.unauthorized('Email y contraseña requeridos'),
        req,
        res
      );
    }
    try {
      const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });
      if (!apiKey) {
        return errorHandler(boom.unauthorized(), req, res);
      }
      const user = await userService.getUsers({ email });
      compare(password, user[0].password, function (err, result) {
        if (!err && result) {
          const { _id: id, firstName, lastName, email } = user[0];
          const claims = {
            sub: id,
            user: {
              firstName,
              lastName,
              email,
            },
            scopes: apiKey.scopes || null,
          };
          const jwtToken = jwt.sign(claims, config.authJwtSecret, {
            expiresIn: '168h',
          });
          return res
            .status(200)
            .json({ jwtToken, user: { id, email, firstName, lastName } });
        } else {
          return errorHandler(boom.unauthorized(), req, res);
        }
      });
    } catch (err) {
      return errorHandler(boom.internal(err), req, res);
    }
  } else {
    return errorHandler(
      boom.methodNotAllowed('This endpoint only supports POST requests'),
      req,
      res
    );
  }
}
