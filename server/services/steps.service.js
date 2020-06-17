const mongoose = require('mongoose');

// Models
const user = require('../models/user.models');

class StepsService {
  constructor() {}

  async isStepDone(userId, stepNumber) {
    const query1 = `steps.${stepNumber.toString()}`;
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

  async stepDone(userId, stepNumber, text) {
    return user.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      {
        $set: { steps: { [stepNumber]: text } },
      },
    );
  }
}

module.exports = new StepsService();
