const bcrypt = require('bcrypt');

const SALTROUNDS = 10;

class PasswordHelpers {
  constructor() {}

  async encrypt(password) {
    const pass = await bcrypt.hash(password, SALTROUNDS);
    return pass;
  }

  async compare(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }
}

module.exports = new PasswordHelpers();
