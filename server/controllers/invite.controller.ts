import * as express from 'express';
const router = express.Router();

// Middlewares
import { ErrorHandler } from '../middlewares/errorHandler.middleware';
import { ResponseHandler } from '../middlewares/responseHandler.middleware';

// Services
import inviteService from '../services/invite.service';

router.post('/', async (req, _, next) => {
  const { UUID } = req.body;
  try {
    if (!UUID || !/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(UUID)) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const hash = inviteService.createHashCode(UUID);
    inviteService.createNewUser(UUID, hash);

    next(new ResponseHandler(200, 'Your invite code', hash));
  } catch (err) {
    next(err);
  }
});

router.post('/verification', async (req, _, next) => {
  const { inviteCode } = req.body;
  try {
    if (!inviteCode || !/^[a-f0-9]{32}$/.test(inviteCode)) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const userExists = await inviteService.userExists(inviteCode);
    if (!userExists) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    next(new ResponseHandler(200, 'Welcome', userExists));
  } catch (err) {
    next(err);
  }
});

export default router;
