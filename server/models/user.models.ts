import * as mongoose from 'mongoose';
import configs from '../configs/configs';

const step = {
  '1': {
    type: String,
    required: false,
  },
  '2': {
    type: String,
    required: false,
  },
  '3': {
    type: String,
    required: false,
  },
  '4': {
    type: String,
    required: false,
  },
};

const schema = new mongoose.Schema(
  {
    UUID: {
      type: String,
      required: false,
    },
    inviteCode: {
      type: String,
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
    email: {
      type: String,
      validate: {
        validator: (v: string) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: 'Email validator',
      },
      required: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    steps: {
      type: step,
      required: false,
    },
    score: {
      type: Number,
      required: false,
      default: 0,
    },
    publicKey: {
      type: String,
      require: false,
    },
    privateKey: {
      type: String,
      require: false,
    },
  },
  { timestamps: true },
);

const myDB = mongoose.connection.useDb(configs.HACKWARS_DB);

export default myDB.model('Users', schema);
