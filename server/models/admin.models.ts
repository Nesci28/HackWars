import * as mongoose from 'mongoose';
import configs from '../configs/configs';

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const myDB = mongoose.connection.useDb(configs.HACKWARS_DB);

export default myDB.model('Admins', schema);
