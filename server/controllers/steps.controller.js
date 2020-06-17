const express = require('express');
const router = express.Router();

// Middlewares
const { ErrorHandler } = require('../middlewares/errorHandler.middleware');
const {
  ResponseHandler,
} = require('../middlewares/responseHandler.middleware');

// Services
const stepsService = require('../services/steps.service');

// Helpers
const JWTHelper = require('../helpers/jwt.helper');

router.get(`/`, async (req, _, next) => {
  const stepNumber = req.query.s;
  if (!stepNumber) {
    throw new ErrorHandler(404, "Something's wrong");
  }

  const token = req.headers['authorization'];
  const userId = await JWTHelper.getId(token);

  const isStepDone = await stepsService.isStepDone(userId, stepNumber);

  next(new ResponseHandler(200, `Is Step ${stepNumber} done`, isStepDone));
});

router.post(`/`, async (req, _, next) => {
  const token = req.headers['authorization'];
  const userId = await JWTHelper.getId(token);
  const { stepNumber, text } = req.body;

  if (!token || !userId || !stepNumber || !text) {
    throw new ErrorHandler(404, "Something's wrong");
  }

  await stepsService.stepDone(userId, stepNumber, text);

  next(new ResponseHandler(200, `Step ${stepNumber} updated successfully`));
});

module.exports = router;
