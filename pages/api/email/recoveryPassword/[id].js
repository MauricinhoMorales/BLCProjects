const boom = require('boom');
const crypto = require('crypto');
const { config } = require('../../../../config/index');
const { errorHandler } = require('../../../../utils/middlewares/errorHandlers');
const UserService = require('../../../../services/user');
const MailjetService = require('../../../../services/mailjet');

export default async function handler(req, res) {
  const { method } = req;
  const userService = new UserService();
  const mailjetService = new MailjetService();

  if (method === 'POST') {
    const {
      query: { id },
    } = req;
    if (!id) {
      return errorHandler(boom.badRequest('UserId is required'), req, res);
    }
    try {
      const recoveryCode = crypto.randomBytes(20).toString('hex');
      const recoveryCodeExpires = Date.now() + 24 * 3600 * 1000;
      const link = `http://${config.url}/recoveryPassword/${recoveryCode}`;
      const user = await userService.getUsers({ email: id });
      mailjetService.sendRecoveryEmail({
        userEmail: id,
        userName: `${user.firstName} ${user.lastName}`,
        link,
      });
      const updatedUserId = await userService.updateUser({
        id: user[0]._id,
        user: { recoveryCode, recoveryCodeExpires },
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
