import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as rateLimit from 'express-rate-limit';

import { checkToken, checkTokenAdmin } from './middlewares/jwt.middleware';
import { handleError } from './middlewares/errorHandler.middleware';
import { handleResponse } from './middlewares/responseHandler.middleware';

// Configs
import configs from './configs/configs';

// ENV
require('dotenv').config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL;
const NODE_ENV = process.env.NODE_ENV;

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('tiny'));

// CORS
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
mongoose.connection.on('error', (err) => {
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
    status: 429,
    statusCode: 429,
    message: 'No bruteforce allowed. reset in 1 minute',
  },
});

// Routes
import route from './controllers/invite.controller';
import auth from './controllers/auth.controller';
import steps from './controllers/steps.controller';
import leaderboard from './controllers/leaderboard.controller';
import admin from './controllers/admin.controller';
import user from './controllers/user.controller';

// Routes
app.use('/invite', limiter, route);
app.use('/auth', auth);
app.use('/leaderboard', leaderboard);
app.use('/steps', checkToken, steps);
app.use('/admin', checkToken, admin);
app.use('/user', checkTokenAdmin, user);

// Error handling
app.use((data: any, _: unknown, res: express.Response, __: unknown) => {
  if (data.statusCode === 200 || data.statusCode === 202) {
    handleResponse(data, res);
  } else {
    console.log('err :>> ', data);
    handleError(data, res);
  }
});

// Starting the App
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// DB Close
const gracefulExit = () => {
  mongoose.connection.close(() => {
    console.log('Closing DB Connection');
    process.exit(0);
  });
};
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
