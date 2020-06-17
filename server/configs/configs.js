require('dotenv').config();

const configs = {
  CORS_URL:
    process.env.NODE_ENV === 'dev'
      ? 'http://localhost:4200'
      : 'https://hackwars.dev',
  HACKWARS_DB: process.env.NODE_ENV === 'dev' ? 'hackwars_dev' : 'hackwars',
};

module.exports = configs;
