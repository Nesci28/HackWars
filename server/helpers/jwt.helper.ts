import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

class JWTHelpers {
  constructor() {}

  async getId(token: string): Promise<string> {
    token = this.cleanToken(token);
    return new Promise<string>((resolve, _) => {
      resolve((jwt.verify(token, JWT_SECRET) as any).id);
    });
  }

  async getUsername(token: string): Promise<string> {
    token = this.cleanToken(token);
    return new Promise<string>((resolve, _) => {
      resolve((jwt.verify(token, JWT_SECRET) as any).username);
    });
  }

  async getRole(token: string): Promise<string> {
    token = this.cleanToken(token);
    return new Promise<string>((resolve, _) => {
      resolve((jwt.verify(token, JWT_SECRET) as any).role);
    });
  }

  async validateJWTToken(token: string): Promise<boolean> {
    token = this.cleanToken(token);
    return new Promise<boolean>((resolve, _) => {
      try {
        jwt.verify(token, JWT_SECRET);
        resolve(true);
      } catch (_) {
        resolve(false);
      }
    });
  }

  cleanToken(token: string): string {
    if (token.startsWith('Bearer ')) {
      token = token.split('Bearer ')[1];
    }
    return token;
  }

  createJWTToken(user: any): string {
    return jwt.sign(
      {
        id: user._id || user.id,
        username: user.username,
        role: user.role || 'user',
      },
      JWT_SECRET,
      { expiresIn: '30d' },
    );
  }
}

export default new JWTHelpers();
