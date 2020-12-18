const {
  config: { sendinblueApiKey },
} = require('../config/index');
const SibApiV3Sdk = require('sib-api-v3-sdk');

class SendinBlueService {
  constructor() {
    this.defaultClient = SibApiV3Sdk.ApiClient.instance;
    this.defaultClient.authentications['api-key'].apiKey = sendinblueApiKey;
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  }

  async sendActivationEmail({ userEmail, userName, link }) {
    this.sendSmtpEmail.templateId = 1;
    await this.sendEmailWithLink({ userEmail, userName, link });
  }

  async sendRecoveryEmail({ userEmail, userName, link }) {
    this.sendSmtpEmail.templateId = 2;
    await this.sendEmailWithLink({ userEmail, userName, link });
  }
  async sendInvitation({ userEmail, userName, link, teamName }) {
    this.sendSmtpEmail.templateId = 3;
    await this.sendEmailWithInvitation({ userEmail, userName, link, teamName });
  }

  async sendEmailWithInvitation({ userEmail, userName, link, teamName }) {
    this.sendSmtpEmail.sender = {
      name: 'BLCProjects Team',
      email: 'blcprojectsteam@gmail.com',
    };
    this.sendSmtpEmail.to = [{ email: userEmail, name: userName }];
    this.sendSmtpEmail.replyTo = {
      name: 'BLCProjects Team',
      email: 'blcprojectsteam@gmail.com',
    };
    this.sendSmtpEmail.params = {
      LINK: link,
      TEAMNAME: teamName,
    };

    try {
      const emailResponse = await this.apiInstance.sendTransacEmail(
        this.sendSmtpEmail
      );
      console.log(emailResponse);
    } catch (err) {
      console.error(err);
    }
  }

  async sendEmailWithLink({ userEmail, userName, link }) {
    this.sendSmtpEmail.sender = {
      name: 'BLCProjects Team',
      email: 'blcprojectsteam@gmail.com',
    };
    this.sendSmtpEmail.to = [{ email: userEmail, name: userName }];
    this.sendSmtpEmail.replyTo = {
      name: 'BLCProjects Team',
      email: 'blcprojectsteam@gmail.com',
    };
    this.sendSmtpEmail.params = {
      LINK: link,
    };

    try {
      const emailResponse = await this.apiInstance.sendTransacEmail(
        this.sendSmtpEmail
      );
      console.log(emailResponse);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = SendinBlueService;
