const MongoLib = require('../lib/db');

class TaskService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'tasks';
  }

  async getTasks({ name, assignedTo, dueDate, creator }) {
    const query = { name, creator, assignedTo, dueDate };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const tasks = await this.MongoDB.getAll(this.collection, query);
    return tasks || [];
  }

  async getTask({ id }) {
    const task = await this.MongoDB.get(this.collection, id);
    return task || [];
  }

  async updateTask({ id, task }) {
    const exist = await this.getTask({ id });
    if (exist._id) {
      return await this.MongoDB.update(this.collection, id, task);
    } else {
      throw new Error('La tarea no existe');
    }
  }

  async deleteTask({ id }) {
    const exist = await this.getTask({ id });
    if (exist._id) {
      return await this.MongoDB.delete(this.collection, id);
    } else {
      throw new Error('La tarea no existe');
    }
  }

  async createTask({ task }) {
    const createdTaskId = await this.MongoDB.create(this.collection, task);
    return createdTaskId;
  }
}

module.exports = TaskService;
