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
  /* async getTeamMembersDetails({ id }) {
    const team = await this.getTeam({
      id,
    });
    if (team.length) {
      throw new Error('El equipo no existe');
    } else {
      let membersDetails = [];
      for (let i = 0; i < team.members.length; i++) {
        let member = await this.userService.getUser({
          id: team.members[i].member_id,
        });
        member = {
          ...member,
          ...team.members[i],
        };
        delete member['password'];
        delete member['isAdmin'];
        membersDetails.push(member);
      }
      return membersDetails;
    }
  }

  async addNewMember({ id, member }) {
    let team = await this.getTeam({ id });
    if (team.length) {
      throw new Error('El equipo no existe');
    } else {
      team.members.push(member);
      return await this.updateTeam({ id, team });
    }
  }

  async addProject({ id, project }) {
    let team = await this.getTeam({ id });
    if (team.length) {
      throw new Error('El equipo no existe');
    } else {
      team = {
        ...team,
        projects: team.projects.push(project) || [project],
      };
      return await this.updateTeam({ id, team });
    }
  } */
}

module.exports = ProjectService;
