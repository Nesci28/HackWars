const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const SALTROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

class PasswordHelpers {
  constructor() {}

  async encrypt(password: string): Promise<string> {
    const pass = await bcrypt.hash(password, SALTROUNDS);
    return pass;
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  cleanToken(token: string) {
    if (token.startsWith('Bearer ')) {
      token = token.split('Bearer ')[1];
    }
    return token;
  }

  createJWTToken(user: any) {
    return jwt.sign(
      {
        username: user.username,
        role: user.role || 'user',
      },
      JWT_SECRET,
      { expiresIn: '30d' },
    );
  }

  async validateJWTToken(token: string) {
    token = this.cleanToken(token);
    try {
      await promisify(jwt.verify)(token, JWT_SECRET);
      return true;
    } catch (_) {
      return false;
    }
  }
}

module.exports = new PasswordHelpers();
