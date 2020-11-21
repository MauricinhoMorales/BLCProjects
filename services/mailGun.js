const { config } = require('../config/index');
const mailGun = require('mailgun-js')({
  apiKey: config.mailGunApiKey,
  domain: config.mailGunDomain,
});

class MaiLGunService {
  async sendActivationEmail({ userEmail, link }) {
    let data = {
      from: `BLCProjects <no-reply.blcprojects@${config.mailGunDomain}>`,
      to: userEmail,
      subject: 'Activación de Cuenta',
      template: 'activation-template',
      'h:X-Mailgun-Variables': `{"link": "${link}"}`,
    };

    const body = await mailGun.messages().send(data);
    return body;
  }
}

module.exports = MaiLGunService;
