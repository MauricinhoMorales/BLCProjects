const MongoLib = require('../lib/db');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'users';
  }

  async getUsers({ email }) {
    const query = { email };

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
      return await this.MongoDB.create(this.collection, {
        ...user,
        password: hashedPassword,
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
