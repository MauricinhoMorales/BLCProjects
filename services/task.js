const MongoLib = require('../lib/db');
const ProjectService = require('./project');

class TaskService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'tasks';
    this.projectService = new ProjectService();
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
      const deletedTaskId = await this.MongoDB.delete(this.collection, id);
      await this.projectService.deleteTaskFromSection({
        id: exist.projects[0].project_id,
        sectionName: exist.projects[0].section_name,
        taskId: deletedTaskId,
      });
      return deletedTaskId;
    } else {
      throw new Error('La tarea no existe');
    }
  }

  async createTask({ task }) {
    const createdTaskId = await this.MongoDB.create(this.collection, task);
    await this.projectService.addTaskToSection({
      id: task.projects[0].project_id,
      sectionName: task.projects[0].section_name,
      taskId: createdTaskId,
    });
    return createdTaskId;
  }
}

module.exports = TaskService;
