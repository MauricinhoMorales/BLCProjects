const MongoLib = require('../lib/db');
const TeamService = require('./teams');
const UserService = require('./user');
const TaskService = require('./task');
const project = require('../utils/models/project');

class ProjectService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'projects';
    this.userService = new UserService();
    this.teamService = new TeamService();
    this.taskService = new TaskService();
  }

  async getProjects({ name, creator, status }) {
    if (creator) {
      const team = await this.teamService.getTeam({ id: creator });
      if (team.length) {
        creator = {
          creator_id: creator,
          isTeam: true,
        };
      } else {
        creator = {
          creator_id: creator,
          isTeam: false,
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
      exist.sections.map(async (section) => {
        await this.deleteSection({ id, sectionName: section.name });
      });
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
      if (!sections) {
        sections = [];
      }
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

  async changeSectionName({ id, oldSectionName, newSectionName }) {
    const exist = await this.getProject({ id });
    if (!exist) {
      throw Error('El proyecto no existe');
    }
    let projectSections = exist.sections;
    let sections = [];
    if (!projectSections) {
      throw Error('El proyecto no tiene secciones');
    }
    projectSections.map((section, index) => {
      let newSection = section;
      if (section.name === oldSectionName) {
        newSection.name = newSectionName;
      }
      sections.push(newSection);
    });
    return await this.updateProject({
      id,
      project: { sections },
    });
  }

  async deleteSection({ id, name }) {
    const project = await this.getProject({ id });
    if (project) {
      project.sections.map(async (section) => {
        section.tasks.map(async (task) => {
          await this.taskService.deleteTask({ id: task });
        });
      });
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

  async getSectionTask({ id, sectionName }) {
    const project = await this.getProject({ id });
    if (!project) {
      throw new Error('El proyecto no existe');
    }
    if (!project.sections) {
      throw new Error('El proyecto no tiene secciones');
    }
    let sections = {};
    for (let j = 0; j < project.sections.length; j++) {
      if (project.sections[j].name === sectionName) {
        sections = { name: sectionName, tasks: [] };
        for (let i = 0; i < project.sections[j].tasks.length; i++) {
          const sectionTask = await this.taskService.getTask({
            id: project.sections[j].tasks[i],
          });
          sections.tasks.push(sectionTask);
        }
        return sections;
      }
    }
    if (!sections.name) {
      throw Error('La seccion no existe');
    }
    return {};
  }
}

module.exports = ProjectService;
