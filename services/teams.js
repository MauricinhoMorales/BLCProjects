const MongoLib = require('../lib/db');
const UserService = require('./user');

class TeamService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'teams';
    this.userService = new UserService();
  }

  async getTeams({ name, creator, areaConocimiento, memberId }) {
    const query = { name, creator, areaConocimiento };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });
    let memberTeams = [];
    const teams = await this.MongoDB.getAll(this.collection, query);
    if (memberId !== undefined) {
      memberTeams = await this.MongoDB.getAll(this.collection, null);
      memberTeams = memberTeams.filter((team) => team.creator !== memberId);
      memberTeams = memberTeams.filter((team) => {
        for (let i = 0; i < team.members.length; i++) {
          if (team.members[i].member_id === memberId) {
            return team;
          }
        }
      });
    }
    return [...teams, ...memberTeams] || [];
  }

  async getTeam({ id }) {
    const team = await this.MongoDB.get(this.collection, id);
    return team || [];
  }

  async updateTeam({ id, team }) {
    const exist = await this.getTeam({ id });
    if (exist._id) {
      return await this.MongoDB.update(this.collection, id, team);
    } else {
      throw new Error('El equipo no existe');
    }
  }

  async deleteTeam({ id }) {
    const exist = await this.getTeam({ id });
    if (exist._id) {
      return await this.MongoDB.delete(this.collection, id);
    } else {
      throw new Error('El equipo no existe');
    }
  }

  async createTeam({ team }) {
    const exist = await this.getTeams({
      name: team.name,
      creator: team.creator,
    });
    if (exist.length) {
      throw new Error('El equipo ya existe para el usuario solicitante');
    } else {
      return await this.MongoDB.create(this.collection, team);
    }
  }

  async getTeamMembersDetails({ id }) {
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
        delete member['activationCode'];
        delete member['activationCodeExpires'];
        delete member['accountActivated'];
        delete member['_id'];
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

  async updateMember({ id, member }) {
    let team = await this.getTeam({ id });
    let existMember = false;
    if (team) {
      for (let i = 0; i < team.members.length; i++) {
        if (team.members[i].member_id === member.member_id) {
          team.members[i] = member;
          existMember = true;
        }
      }
      if (!existMember) {
        throw new Error('Miembro no se encuentra agregado al equipo');
      }
      team.members = team.members.sort((a, b) => a.member_id > b.member_id);
      return await this.updateTeam({ id, team });
    } else {
      throw new Error('El equipo no existe');
    }
  }

  async deleteMember({ id, memberId }) {
    let team = await this.getTeam({ id });
    if (team) {
      team.members = team.members.filter(
        (member) => member.member_id !== memberId
      );
      team.members = team.members.sort((a, b) => a.member_id > b.member_id);
      return await this.updateTeam({ id, team });
    } else {
      throw new Error('El equipo no existe');
    }
  }

  async addProject({ id, project }) {
    let team = await this.getTeam({ id });
    if (team.length) {
      throw new Error('El equipo no existe');
    } else {
      let projects = team.projects;
      projects.push(project.project);
      team = {
        ...team,
        projects,
      };
      return await this.updateTeam({ id, team });
    }
  }

  async deleteProject({ id, projectId }) {
    let team = await this.getTeam({ id });
    if (team.length) {
    } else {
      team = {
        ...team,
        projects:
          team.projects.filter((project) => project !== projectId) || [],
      };
      return await this.updateTeam({ id, team });
    }
  }
}

module.exports = TeamService;
