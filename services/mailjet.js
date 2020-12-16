const { config } = require('../config/index');
const mailjet = require('node-mailjet').connect(
  config.mjApikeyPublic,
  config.mjApikeyPrivate
);

class MailjetService {
  async sendActivationEmail({ userEmail, userName, link }) {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'blcprojectsteam@gmail.com',
            Name: 'BLCProjects Team',
          },
          To: [
            {
              Email: userEmail,
              Name: userName,
            },
          ],
          TemplateID: 1947531,
          TemplateLanguage: true,
          Subject: 'Activación de Cuenta BLCProjects',
          Variables: {
            link: link,
          },
        },
      ],
    });
    try {
      const respose = await request;
      console.log('Mailjet response', respose);
    } catch (err) {
      console.log('Mailjet error', err);
    }
  }

  sendRecoveryEmail({ userEmail, userName, link }) {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'blcprojectsteam@gmail.com',
            Name: 'BLCProjects Team',
          },
          To: [
            {
              Email: userEmail,
              Name: userName,
            },
          ],
          TemplateID: 1973395,
          TemplateLanguage: true,
          Subject: 'Recuperación de Contraseña',
          Variables: {
            userName: userName || 'Usuario',
            link: link,
          },
        },
      ],
    });
    request
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = MailjetService;
