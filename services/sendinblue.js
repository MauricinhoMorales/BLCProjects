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
    this.sendersApi = new SibApiV3Sdk.SendersApi();
    this.sender = {};
  }

  async getSender() {
    try {
      const senders = await this.sendersApi.getSenders();
      this.sender = senders.senders.filter(
        (sender) => sender.email === 'blcprojectsteam@gmail.com'
      )[0];
    } catch (err) {
      console.error(err);
    }
  }

  async sendActivationEmail({ userEmail, userName, link }) {
    await this.getSender();

    this.sendSmtpEmail.sender = {
      name: this.sender.name,
      email: this.sender.email,
    };
    this.sendSmtpEmail.to = [{ email: userEmail, name: userName }];
    this.sendSmtpEmail.replyTo = {
      name: this.sender.name,
      email: this.sender.email,
    };
    this.sendSmtpEmail.templateId = 1;
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

  async sendRecoveryEmail({ userEmail, userName, link }) {
    await this.getSender();

    this.sendSmtpEmail.sender = {
      name: this.sender.name,
      email: this.sender.email,
    };
    this.sendSmtpEmail.to = [{ email: userEmail, name: userName }];
    this.sendSmtpEmail.replyTo = {
      name: this.sender.name,
      email: this.sender.email,
    };
    this.sendSmtpEmail.templateId = 2;
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
