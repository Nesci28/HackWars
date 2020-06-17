// Models
const user = require('../models/user.models');

// Helpers
const passwordHelpers = require('../helpers/password.helper');
const JWTHelpers = require('../helpers/jwt.helper');

class AuthService {
  constructor() {}

  async createUser(inviteCode, username, email, password) {
    const encryptedPassword = await passwordHelpers.encrypt(password);
    const lowerCasedUsername = username.toLowerCase();
    return user.findOneAndUpdate(
      { inviteCode },
      { username: lowerCasedUsername, email, password: encryptedPassword },
      { new: true },
    );
  }

  async findUsername(username) {
    return user.findOne({ username });
  }

  createToken(user) {
    return JWTHelpers.createJWTToken(user);
  }

  async comparePassword(password, encryptedPassword) {
    return passwordHelpers.compare(password, encryptedPassword);
  }
}

module.exports = new AuthService();
