require('dotenv').config();

const configs = {
  CORS_URL:
    process.env.NODE_ENV === 'prod'
      ? 'https://hackwars.dev'
      : 'http://localhost:4200',
  HACKWARS_DB: process.env.NODE_ENV === 'prod' ? 'hackwars' : 'hackwars_dev',
};

export default configs;
