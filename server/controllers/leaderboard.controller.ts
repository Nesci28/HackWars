import * as express from 'express';
const router = express.Router();

// Middlewares
import { ErrorHandler } from '../middlewares/errorHandler.middleware';
import { ResponseHandler } from '../middlewares/responseHandler.middleware';

// Services
import leaderboardService from '../services/leaderboard.service';

router.get(`/`, async (_, __, next: express.NextFunction) => {
  next(
    new ResponseHandler(
      200,
      'Leaderboard',
      await leaderboardService.getLeaderboard(),
    ),
  );
});

router.get(
  `/profile`,
  async (req: express.Request, _, next: express.NextFunction) => {
    const userId = req.query.p as string;
    if (!userId) {
      throw new ErrorHandler(404, "Something's wrong");
    }

    next(
      new ResponseHandler(
        200,
        'User profile',
        await leaderboardService.getUserProfile(userId),
      ),
    );
  },
);

export default router;
