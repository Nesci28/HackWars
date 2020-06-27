import * as mongoose from 'mongoose';
import { v4 } from 'uuid';
import { generateKeyPairSync } from 'crypto';

// Models
import user from '../models/user.models';
import adminModels from '../models/admin.models';

class StepsService {
  constructor() {}

  async isStepDone(userId: string, stepNumber: string): Promise<boolean> {
    const query1 = `steps.${stepNumber}`;
    return (
      (
        await user.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
              [query1]: { $exists: true },
            },
          },
        ])
      ).length > 0
    );
  }

  async stepDone(
    userId: string,
    stepNumber: string,
    text: string,
  ): Promise<any> {
    const stepsInfo = {
      '1': {
        score: 10,
        role: 'user',
      },
      '2': {
        score: 35,
        role: 'admin',
      },
      '3': {
        score: 60,
        role: 'admin',
      },
      '4': {
        score: 100,
        role: 'admin',
      },
    };
    return user.updateOne(
      {
        _id: mongoose.Types.ObjectId(userId),
      },
      {
        $set: {
          [`steps.${stepNumber}`]: text,
          score: stepsInfo[stepNumber].score,
          role: stepsInfo[stepNumber].role,
        },
      },
    );
  }

  async createAdminAccount(userId: string): Promise<any> {
    return adminModels.create({
      userId: mongoose.Types.ObjectId(userId),
      username: 'JohnHammond',
      password: v4(),
    });
  }

  async generateSSHKeys(password: string): Promise<any> {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096, // the length of your key in bits
      publicKeyEncoding: {
        type: 'spki', // recommended to be 'spki' by the Node.js docs
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
        format: 'pem',
        cipher: 'aes-256-cbc', // *optional*
        passphrase: password, // *optional*
      },
    });
    return {
      publicKey,
      privateKey,
    };
  }

  async createSSHKeys(
    userId: string,
    publicKey: string,
    privateKey: string,
  ): Promise<any> {
    return user.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      {
        $set: { publicKey, privateKey },
      },
    );
  }
}

export default new StepsService();
