import * as express from 'express';
const router = express.Router();

// Middlewares
import { ErrorHandler } from '../middlewares/errorHandler.middleware';
import { ResponseHandler } from '../middlewares/responseHandler.middleware';

// Services
import stepsService from '../services/steps.service';

// Helpers
import JWTHelper from '../helpers/jwt.helper';

router.get(`/`, async (req, _, next) => {
  const stepNumber = req.query.s as string;
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

  if (!stepNumber || !text) {
    throw new ErrorHandler(404, "Something's wrong");
  }

  if (stepNumber === '1') {
    await stepsService.stepDone(userId, stepNumber, text);
    await stepsService.createAdminAccount(userId);
  }

  if (stepNumber === '2') {
    await stepsService.stepDone(userId, stepNumber, text);
    const { publicKey, privateKey } = await stepsService.generateSSHKeys(
      userId,
    );
    await stepsService.createSSHKeys(userId, publicKey, privateKey);
  }

  next(new ResponseHandler(200, `Step ${stepNumber} updated successfully`));
});

export default router;
