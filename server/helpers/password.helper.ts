import * as bcrypt from 'bcrypt';

const SALTROUNDS = 10;

class PasswordHelpers {
  constructor() {}

  async encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, SALTROUNDS);
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}

export default new PasswordHelpers();
