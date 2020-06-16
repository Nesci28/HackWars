import express = require('express');
const router = express.Router();

// Middlewares
const { ErrorHandler } = require('../middlewares/errorHandler.middleware');
const {
  ResponseHandler,
} = require('../middlewares/responseHandler.middleware');

// Services
const authService = require('../services/auth.service');
const inviteService = require('../services/invite.service');

router.post(`/signup`, async (req, res, next) => {
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

    const token = await authService.createToken(user);

    next(new ResponseHandler(200, 'New user created', token));
  } catch (err) {
    next(err);
  }
});

router.post(`/login`, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const user = await authService.findUsername(username.toLowerCase());
    if (Object.keys(user).length === 0 || !user.password) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const comparedPassword = await authService.comparePassword(
      password,
      user.password,
    );
    if (!comparedPassword) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    const token = await authService.createToken(user);

    next(new ResponseHandler(200, 'Login', token));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
