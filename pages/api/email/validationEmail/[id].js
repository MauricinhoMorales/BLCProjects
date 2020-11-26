const boom = require('boom');
const crypto = require('crypto');
const { config } = require('../../../../config/index');
const { errorHandler } = require('../../../../utils/middlewares/errorHandlers');
const UserService = require('../../../../services/user');
const MailGunService = require('../../../../services/mailGun');

export default async function handler(req, res) {
  debugger;
  const { method } = req;
  const userService = new UserService();
  const mailGunService = new MailGunService();

  if (method === 'POST') {
    const {
      query: { id },
    } = req;
    if (!id) {
      return errorHandler(boom.badRequest('UserId is required'), req, res);
    }
    try {
      const activationCode = crypto.randomBytes(20).toString('hex');
      const activationCodeExpires = Date.now() + 24 * 3600 * 1000;
      const link = `http://${config.url}/activation/${activationCode}`;
      const user = await userService.getUser({ id });
      mailGunService.sendActivationEmail({
        userEmail: user.email,
        link,
      });
      const updatedUserId = await userService.updateUser({
        id,
        user: { activationCode, activationCodeExpires },
      });
      return res.status(200).json(updatedUserId);
    } catch (err) {
      return errorHandler(boom.internal(err), req, res);
    }
  } else {
    return errorHandler(
      boom.methodNotAllowed('This endpoint only accepts POST requests'),
      req,
      res
    );
  }
}
