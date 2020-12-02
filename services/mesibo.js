const MongoLib = require('../lib/db');
const { config } = require('../config/index');
const Axios = require('axios');

class MesiboService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.userCollection = 'mesibo_users';
    this.messageCollection = 'mesibo_messages';
    this.axios = Axios.create({
      baseURL: config.mesiboApiUrl,
    });
  }

  async addUser({ userId }) {
    if (!userId) {
      throw new Error('userId es requerido');
    }
    try {
      const addUserResponse = await Axios.post(
        config.mesiboApiUrl,
        {},
        {
          params: {
            op: 'useradd',
            token: config.mesiboAccessToken,
            addr: userId,
            appId: 'com.blcglobal.blcprojects',
          },
        }
      );
      if (addUserResponse.data.result) {
        return this.MongoDB.create(this.userCollection, {
          uid: addUserResponse.data.uid,
          userId,
          token: addUserResponse.data.token,
        });
      } else {
        throw new Error(addUserResponse.data.error);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}

module.exports = MesiboService;
