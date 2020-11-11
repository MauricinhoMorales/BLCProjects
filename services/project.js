const MongoLib = require('../lib/db');
const TeamService = require('./teams');
const UserService = require('./user');

class ProjectService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'projects';
    this.userService = new UserService();
    this.teamService = new TeamService();
  }

  async getProjects({ name, creator, status }) {
    if (creator) {
      const team = await this.teamService.getTeam({ id: creator });
      if (team.length) {
        creator = {
          creator_id: creator,
          isTeam: false,
        };
      } else {
        creator = {
          creator_id: creator,
          isTeam: true,
        };
      }
    }
    const query = { name, creator, status };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const projects = await this.MongoDB.getAll(this.collection, query);
    return projects || [];
  }

  async getProject({ id }) {
    const project = await this.MongoDB.get(this.collection, id);
    return project || [];
  }

  async updateProject({ id, project }) {
    const exist = await this.getProject({ id });
    if (exist._id) {
      return await this.MongoDB.update(this.collection, id, project);
    } else {
      throw new Error('El proyecto no existe');
    }
  }

  async deleteProject({ id }) {
    const exist = await this.getProject({ id });
    if (exist._id) {
      return await this.MongoDB.delete(this.collection, id);
    } else {
      throw new Error('El proyecto no existe');
    }
  }

  async createProject({ project }) {
    const exist = await this.getProjects({
      name: project.name,
      creator: project.creator.creator_id,
    });
    if (exist.length) {
      throw new Error('El equipo ya existe para el usuario solicitante');
    } else {
      return await this.MongoDB.create(this.collection, project);
    }
  }

  async getProjectSections({ id }) {
    const project = await this.getProject({ id });
    if (project) {
      return project.sections;
    } else {
      throw Error('El proyecto no existe');
    }
  }

  async addNewSection({ id, section }) {
    const project = await this.getProject({ id });
    if (project) {
      let { sections } = project;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].name === section.name) {
          throw Error('La seccion ya existe');
        }
      }
      sections.push(section);
      const updatedProject = {
        ...project,
        sections,
      };
      return await this.updateProject({ id, project: updatedProject });
    } else {
      throw Error('El proyecto no existe');
    }
  }

  async deleteSection({ id, name }) {
    const project = await this.getProject({ id });
    if (project) {
      let newSections = project.sections.filter(function (value) {
        return value.name !== name;
      });
      const updatedProject = {
        ...project,
        sections: newSections,
      };
      return await this.updateProject({ id, project: updatedProject });
    } else {
      throw Error('El proyecto no existe');
    }
  }

  async addTaskToSection({ id, sectionName, taskId }) {
    const exist = await this.getProject({ id });
    if (exist) {
      let sections = exist.sections;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].name === sectionName) {
          sections[i].tasks.push(taskId);
          break;
        }
      }
      return await this.updateProject({ id, project: { sections } });
    } else {
      throw Error('El proyecto no existe');
    }
  }

  async deleteTaskFromSection({ id, sectionName, taskId }) {
    const exist = await this.getProject({ id });
    if (exist) {
      let sections = exist.sections;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].name === sectionName) {
          let newTaskList = sections[i].tasks.filter((task) => task !== taskId);
          sections[i].tasks = newTaskList;
          break;
        }
      }
      return await this.updateProject({ id, project: { sections } });
    } else {
      throw Error('El proyecto no existe');
    }
  }

  async changeTaskSection({ id, changeTaskSection }) {
    const exist = await this.getProject({ id });
    if (exist) {
      let sections = exist.sections;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].name === changeTaskSection.actual_section_name) {
          let newTaskList = sections[i].tasks.filter(
            (task) => task !== changeTaskSection.task_id
          );
          sections[i].tasks = newTaskList;
        }
        if (sections[i].name === changeTaskSection.new_section_name) {
          sections[i].tasks.push(changeTaskSection.task_id);
        }
      }
      return await this.updateProject({ id, project: { sections } });
    } else {
      throw Error('El proyecto no existe');
    }
  }
}

module.exports = ProjectService;
