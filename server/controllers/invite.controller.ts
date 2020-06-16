import express = require('express');
const router = express.Router();

// Middlewares
const { ErrorHandler } = require('../middlewares/errorHandler.middleware');
const {
  ResponseHandler,
} = require('../middlewares/responseHandler.middleware');

// Services
const inviteService = require('../services/invite.service');

router.post('', async (req, _, next) => {
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

module.exports = router;
