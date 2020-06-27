import * as mongoose from 'mongoose';

// Models
import admin from '../models/admin.models';
import { ErrorHandler } from '../middlewares/errorHandler.middleware';

class AdminService {
  constructor() {}

  isJSON(body: any): boolean {
    return (
      body.join('').startsWith('{') ||
      body.join('').startsWith("'") ||
      body.join('').startsWith('"')
    );
  }

  async injection(body: any, userId: string): Promise<any> {
    let res = await admin.find(body);
    res = res.filter((r: any) => r.userId == userId);
    if (res.length === 0) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    return res;
  }

  async login(
    userId: string,
    username: string,
    password: string,
  ): Promise<any> {
    return admin.findOne({
      userId: mongoose.Types.ObjectId(userId),
      username,
      password,
    });
  }
}

export default new AdminService();
