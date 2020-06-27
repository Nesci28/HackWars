// Models
import user from '../models/user.models';

// Helpers
import passwordHelpers from '../helpers/password.helper';
import jwtHelper from '../helpers/jwt.helper';

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

  createToken(user: string): string {
    return jwtHelper.createJWTToken(user);
  }

  async comparePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return passwordHelpers.compare(password, encryptedPassword);
  }

  async isJWTValid(token: string): Promise<boolean> {
    return jwtHelper.validateJWTToken(token);
  }
}

export default new AuthService();
