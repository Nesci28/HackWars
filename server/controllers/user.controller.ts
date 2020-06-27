import * as express from 'express';
const router = express.Router();

// Middlewares
import { ErrorHandler } from '../middlewares/errorHandler.middleware';
import { ResponseHandler } from '../middlewares/responseHandler.middleware';

// Services
import userService from '../services/user.service';
import authService from '../services/auth.service';

// Helpers
import jwtHelper from '../helpers/jwt.helper';

router.get(`/`, async (req, _, next) => {
  try {
    const token = req.headers['authorization'];
    const userId = await jwtHelper.getId(token);
    const user = await userService.getUser(userId);

    next(new ResponseHandler(200, 'User info', user));
  } catch (err) {
    next(err);
  }
});

router.get(`/server`, async (req, _, next) => {
  try {
    const token = req.headers['authorization'];
    const userId = await jwtHelper.getId(token);
    const status = req.query.s as string;

    if (!status) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    next(
      new ResponseHandler(
        200,
        'Server status',
        await userService.getServerStatus(userId, status),
      ),
    );
  } catch (err) {
    next(err);
  }
});

router.post(`/server`, async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const userId = await jwtHelper.getId(token);
    const { status } = req.body;

    if (!status) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const res = await userService.setServerStatus(userId, status);
    next(new ResponseHandler(200, 'Server status set', res));
  } catch (err) {
    next(err);
  }
});

export default router;
