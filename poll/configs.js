require('dotenv').config();

const configs = {
  HACKWARS_DB: process.env.NODE_ENV === 'prod' ? 'hackwars' : 'hackwars_dev',
};

module.exports = configs;
