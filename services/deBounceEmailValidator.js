const { config } = require('../config/index');

const Axios = require('axios');

class EmailValidatorService {
  constructor() {
    this.apiUrl = config.deBounceApiUrl;
    this.apiKey = config.deBounceApiKey;
  }

  async validateEmail({ email }) {
    try {
      const response = await Axios.get(this.apiUrl, {
        params: {
          api: this.apiKey,
          email,
        },
      });
      if (response.data.debounce.code === '5') return true;
      return false;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = EmailValidatorService;
