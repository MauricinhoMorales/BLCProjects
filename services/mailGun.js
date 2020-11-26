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

    mailGun
      .messages()
      .send(data)
      .then((body) => {
        console.log(body);
      });
  }

  async sendRecoveryEmail({ userEmail, link }) {
    let data = {
      from: `BLCProjects <no-reply.blcprojects@${config.mailGunDomain}>`,
      to: userEmail,
      subject: 'Recuperación de Contraseña',
      template: 'recovery-password',
      'h:X-Mailgun-Variables': `{"link": "${link}"}`,
    };

    mailGun
      .messages()
      .send(data)
      .then((body) => {
        console.log(body);
      });
  }
}

module.exports = MaiLGunService;
