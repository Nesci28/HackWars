import * as mongoose from 'mongoose';
import configs from '../configs/configs';

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    publicKey: {
      type: String,
      require: false,
    },
    privateKey: {
      type: String,
      require: false,
    },
    status: {
      type: String,
      enum: ['starting', 'running'],
    },
    url: {
      type: String,
      require: false,
    },
  },
  { timestamps: true },
);

const myDB = mongoose.connection.useDb(configs.HACKWARS_DB);

export default myDB.model('Servers', schema);
