import * as express from 'express';
const router = express.Router();

// Middlewares
import { ErrorHandler } from '../middlewares/errorHandler.middleware';
import { ResponseHandler } from '../middlewares/responseHandler.middleware';

// Services
import adminService from '../services/admin.service';

// Helpers
import JWTHelper from '../helpers/jwt.helper';

router.post(`/`, async (req, _, next) => {
  try {
    const token = req.headers['authorization'];
    const userId = await JWTHelper.getId(token);
    const username = await JWTHelper.getUsername(token);
    const body = req.body.params.filter(Boolean);

    let res: any;
    if (adminService.isJSON(body)) {
      try {
        res = await adminService.injection(JSON.parse(body.join('')), userId);
        next(new ResponseHandler(202, 'Admin Account', res));
      } catch (err) {
        throw new ErrorHandler(500, err.toString());
      }
    } else {
      try {
        res = await adminService.login(userId, body[0], body[1]);
        if (!res) {
          throw new Error();
        }

        const token = JWTHelper.createJWTToken({
          id: userId,
          username,
          role: 'admin',
        });

        next(new ResponseHandler(200, 'Admin Logged In', token));
      } catch (err) {
        console.log('err :>> ', err);
        throw new ErrorHandler(404, "Something's wrong");
      }
    }

    if (!res) {
      throw new ErrorHandler(404, "Something's wrong");
    }
  } catch (err) {
    next(err);
  }
});

export default router;
