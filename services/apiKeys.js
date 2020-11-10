const MongoLib = require('../lib/db');

class ApiKeysService {
  constructor() {
    this.collection = 'api-Keys';
    this.MongoDB = new MongoLib();
  }

  async getApiKey({ token }) {
    const [apiKey] = await this.MongoDB.getAll(this.collection, { token });
    return apiKey;
  }
}
module.exports = ApiKeysService;
