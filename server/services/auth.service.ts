// Models
const user = require('../models/user.models');

// Helpers
const passwordHelpers = require('../helpers/password.helper');

class AuthService {
  constructor() {}

  async createUser(
    inviteCode: string,
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    const encryptedPassword = await passwordHelpers.encrypt(password);
    const lowerCasedUsername = username.toLowerCase();
    return user.findOneAndUpdate(
      { inviteCode },
      { username: lowerCasedUsername, email, password: encryptedPassword },
      { new: true },
    );
  }

  async findUsername(username: string): Promise<any> {
    return user.findOne({ username });
  }

  createToken(user: any): string {
    return passwordHelpers.createJWTToken(user);
  }

  async comparePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return passwordHelpers.compare(password, encryptedPassword);
  }
}

module.exports = new AuthService();
