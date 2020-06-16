export {};
const { v4 } = require('uuid');
const crypto = require('crypto');

// Models
const user = require('../models/user.models');

class InviteService {
  constructor() {}

  createHashCode(UUID: string): string {
    return crypto.createHash('md5').update(`${UUID}${v4()}`).digest('hex');
  }

  async createNewUser(UUID: string, inviteCode: string): Promise<void> {
    await user.create({
      UUID,
      inviteCode,
    });
  }

  async userExists(inviteCode: string): Promise<boolean> {
    return (
      (
        await user.find({
          inviteCode,
          username: null,
          password: null,
          email: null,
        })
      ).length > 0
    );
  }
}

module.exports = new InviteService();
