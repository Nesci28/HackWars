const mongoose = require('mongoose');
const cp = require('child_process');

// Constants
require('dotenv').config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL;

// Models
const server = require('./server');

// DB
mongoose.set('useFindAndModify', false);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}`,
  options,
);

mongoose.connection.on('connected', () => {
  console.log('Connected to DB');
});
mongoose.connection.on('error', (err) => {
  console.log('Failed to connect to DB', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from DB');
});

(async () => {
  await getStarting();
  setInterval(async () => {
    await getStarting();
  }, 10 * 1000);
})();

async function getStarting() {
  const entries = await server.find({ status: 'starting' });
  if (entries.length > 0) {
    for (const entry of entries) {
      cp.execSync(`touch test.txt`);
      await server.updateOne(
        {
          _id: mongoose.Types.ObjectId(entry._id),
        },
        {
          $set: { status: 'running' },
        },
      );
    }
  }
}
