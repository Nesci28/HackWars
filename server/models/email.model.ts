import * as mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (v: string) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: 'Email validator',
      },
    },
  },
  { timestamps: true },
);

const myDB = mongoose.connection.useDb('email');

export default myDB.model('Emails', schema);
