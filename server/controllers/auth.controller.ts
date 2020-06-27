import * as express from 'express';
const router = express.Router();

// Middlewares
import { ErrorHandler } from '../middlewares/errorHandler.middleware';
import { ResponseHandler } from '../middlewares/responseHandler.middleware';

// Services
import authService from '../services/auth.service';
import inviteService from '../services/invite.service';

router.post(`/signup`, async (req, _, next) => {
  const { inviteCode, username, email, password } = req.body;
  try {
    if (!inviteCode || !username || !email || !password) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const userExists = await inviteService.userExists(inviteCode);
    if (!userExists) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const user = await authService.createUser(
      inviteCode,
      username,
      email,
      password,
    );

    const token = authService.createToken(user);

    next(new ResponseHandler(200, 'New user created', token));
  } catch (err) {
    next(err);
  }
});

router.post(`/login`, async (req, _, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const user = await authService.findUsername(username.toLowerCase());
    if (!user || !user.password) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const comparedPassword = await authService.comparePassword(
      password,
      user.password,
    );
    if (!comparedPassword) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const token = authService.createToken(user);

    next(new ResponseHandler(200, 'Login', token));
  } catch (err) {
    next(err);
  }
});

router.get(`/jwt`, async (req, _, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const isJWTValid = authService.isJWTValid(token);
    if (!isJWTValid) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    next(new ResponseHandler(200, 'JWT Valid'));
  } catch (err) {
    next(err);
  }
});

export default router;
