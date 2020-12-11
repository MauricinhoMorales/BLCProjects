const MongoLib = require('../lib/db');
const UserService = require('./user');

class TeamService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'teams';
    this.userService = new UserService();
  }

  async getTeams({ name, creator, areaConocimiento }) {
    const query = { name, creator, areaConocimiento };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const teams = await this.MongoDB.getAll(this.collection, query);
    return teams || [];
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
  }
}

module.exports = TeamService;
