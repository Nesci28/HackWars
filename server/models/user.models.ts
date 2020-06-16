export {};
const mongoose = require('mongoose');
const configs = require('../configs/configs');

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
        validator: (v) => {
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
  },
  { timestamps: true },
);

const myDB = mongoose.connection.useDb(configs.HACKWARS_DB);

module.exports = myDB.model('Users', schema);
