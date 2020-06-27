import { v4 } from 'uuid';
import * as crypto from 'crypto';

// Models
import user from '../models/user.models';

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

export default new InviteService();
