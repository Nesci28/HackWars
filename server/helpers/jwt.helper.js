const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const JWT_SECRET = process.env.JWT_SECRET;

class JWTHelpers {
  constructor() {}

  async getId(token) {
    token = this.cleanToken(token);
    return (await promisify(jwt.verify)(token, JWT_SECRET)).id;
  }

  async getUsername(token) {
    token = this.cleanToken(token);
    return (await promisify(jwt.verify)(token, JWT_SECRET)).username;
  }

  cleanToken(token) {
    if (token.startsWith('Bearer ')) {
      token = token.split('Bearer ')[1];
    }
    return token;
  }

  createJWTToken(user) {
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role || 'user',
      },
      JWT_SECRET,
      { expiresIn: '30d' },
    );
  }

  async validateJWTToken(token) {
    token = this.cleanToken(token);
    try {
      await promisify(jwt.verify)(token, JWT_SECRET);
      return true;
    } catch (_) {
      return false;
    }
  }
}

module.exports = new JWTHelpers();
