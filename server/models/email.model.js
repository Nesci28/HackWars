const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (v) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: 'Email validator',
      },
    },
  },
  { timestamps: true },
);

const myDB = mongoose.connection.useDb('email');

module.exports = myDB.model('Emails', schema);
