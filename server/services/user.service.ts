import * as mongoose from 'mongoose';

// Models
import user from '../models/user.models';
import server from '../models/server.models';
import { ErrorHandler } from '../middlewares/errorHandler.middleware';

class UserService {
  constructor() {}

  async getUser(userId: string): Promise<any> {
    return user.findOne(
      { _id: mongoose.Types.ObjectId(userId) },
      {
        createdAt: 0,
        updatedAt: 0,
        inviteCode: 0,
        email: 0,
        password: 0,
        __v: 0,
      },
    );
  }

  async setServerStatus(userId: string, status: string): Promise<any> {
    if (status === 'starting') {
      const res = await server.findOne({
        userId: mongoose.Types.ObjectId(userId),
        status: { $ne: null },
      });
      if (res !== null) {
        throw new ErrorHandler(404, 'Server is already running');
      }

      return server.create({
        userId: mongoose.Types.ObjectId(userId),
        status,
      });
    }

    if (status === 'running') {
      const res = await server.findOne({
        userId: mongoose.Types.ObjectId(userId),
        status: 'starting',
      });
      if (res === null) {
        throw new ErrorHandler(404, 'No server is currently starting');
      }

      return server.updateOne(
        {
          userId: mongoose.Types.ObjectId(userId),
          status,
        },
        {
          $set: { status },
        },
      );
    }
  }

  async getServerStatus(userId: string, status: string): Promise<any> {
    return await server.findOne({
      userId: mongoose.Types.ObjectId(userId),
      status,
    });
  }
}

export default new UserService();
