// Models
import user from '../models/user.models';
import * as mongoose from 'mongoose';

class LeaderboardService {
  constructor() {}

  async getLeaderboard(): Promise<any> {
    return user
      .find(
        { score: { $exists: true, $ne: 0 } },
        {
          score: 1,
          username: 1,
        },
      )
      .sort({ score: -1 });
  }

  async getUserProfile(userId: string): Promise<any> {
    return user.findOne(
      { _id: mongoose.Types.ObjectId(userId) },
      { steps: 1, username: 1, score: 1 },
    );
  }
}

export default new LeaderboardService();
