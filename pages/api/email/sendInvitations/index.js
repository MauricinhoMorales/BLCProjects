const boom = require('boom');
const crypto = require('crypto');
const { config } = require('../../../../config/index');
const { errorHandler } = require('../../../../utils/middlewares/errorHandlers');
const SendinBlueService = require('../../../../services/sendinblue');
const TeamService = require('../../../../services/teams');

export default async function handler(req, res) {
  const { method } = req;
  const sendinBlueService = new SendinBlueService();
  const teamService = new TeamService();

  if (method === 'POST') {
    const {
      body: { members, teamId },
    } = req;
    const team = await teamService.getTeam({ id: teamId });
    for (let i = 0; i < members.length; i++) {
      try {
        const link = `${config.url}/sentEmail/inviteMember/${members[i]._id}?teamId=${teamId}`;
        sendinBlueService.sendInvitation({
          userEmail: members[i].email,
          userName: `${members[i].firstName} ${members[i].lastName}`,
          link,
          teamName: team.name,
        });
      } catch (err) {
        return errorHandler(boom.internal(err), req, res);
      }
    }
    return res.status(200);
  } else {
    return errorHandler(
      boom.methodNotAllowed('This endpoint only accepts POST requests'),
      req,
      res
    );
  }
}
