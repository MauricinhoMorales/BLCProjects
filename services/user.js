const MongoLib = require('../lib/db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { config } = require('../config/index');
const SendinBlueService = require('./sendinblue');

class UserService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'users';
    this.sendingblueService = new SendinBlueService();
  }

  async getUsers({
    email,
    name,
    accountActivated,
    activationCode,
    recoveryCode,
  }) {
    const query = {
      email,
      name,
      accountActivated,
      activationCode,
      recoveryCode,
    };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const users = await this.MongoDB.getAll(this.collection, query);
    return users || [];
  }

  async getUser({ id }) {
    const user = await this.MongoDB.get(this.collection, id);
    return user || [];
  }

  async createUser({ user }) {
    const exist = await this.getUsers({ email: user.email });
    if (exist.length) {
      throw new Error('El usuario ya existe');
    } else {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const activationCode = crypto.randomBytes(20);
      const activationCodeExpires = Date.now() + 24 * 3600 * 1000;
      const link = `${config.url}/activation/${activationCode.toString('hex')}`;
      this.sendingblueService.sendActivationEmail({
        userEmail: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        link,
      });
      return await this.MongoDB.create(this.collection, {
        ...user,
        password: hashedPassword,
        accountActivated: false,
        activationCode: activationCode.toString('hex'),
        activationCodeExpires,
      });
    }
  }

  async updateUser({ id, user }) {
    const exist = await this.getUser({ id });
    if (exist._id) {
      return await this.MongoDB.update(this.collection, id, user);
    } else {
      throw new Error('El usuario no existe');
    }
  }

  async deleteUser({ id }) {
    const exist = await this.getUser({ id });
    if (exist._id) {
      return await this.MongoDB.delete(this.collection, id);
    } else {
      throw new Error('El usuario no existe');
    }
  }
}

module.exports = UserService;
