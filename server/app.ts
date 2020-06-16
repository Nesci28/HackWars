import express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const { handleError } = require('./middlewares/errorHandler.middleware');
const { handleResponse } = require('./middlewares/responseHandler.middleware');

// Configs
const configs = require('./configs/configs');

// ENV
require('dotenv').config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL;
const NODE_ENV = process.env.NODE_ENV;

// Middlewares
const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('tiny'));

// CORS
console.log('configs.CORS_URL :>> ', configs.CORS_URL);
app.use(cors({ origin: configs.CORS_URL }));

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
mongoose.connection.on('error', (err: any) => {
  console.log('Failed to connect to DB', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from DB');
});

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: NODE_ENV === 'dev' ? Infinity : 3,
  message: {
    status: 'error',
    statusCode: 429,
    message: 'No bruteforce allowed. reset in 1 minutes',
  },
});

// Routes
app.use('/', limiter, require('./controllers/invite.controller.ts'));
app.use('/auth', require('./controllers/auth.controller.ts'));

// Error handling
app.use((err: any, _: any, res: any, __: any) => {
  if (err.statusCode === 200) {
    handleResponse(err, res);
  } else {
    console.log('err :>> ', err);
    handleError(err, res);
  }
});

// Starting the App
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// DB Close
const gracefulExit = function () {
  mongoose.connection.close(function () {
    console.log('Closing DB Connection');
    process.exit(0);
  });
};
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
