import * as express from 'express';
import * as jwt from 'jsonwebtoken';

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middlewares
import { ErrorHandler } from '../middlewares/errorHandler.middleware';

// Helpers
import jwtHelper from '../helpers/jwt.helper';

function checkTokenAdmin(
  req: express.Request,
  _: express.Response,
  next: express.NextFunction,
) {
  const token = jwtHelper.cleanToken(req.headers['authorization']);
  if (!token) {
    throw new ErrorHandler(404, "Something's wrong");
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (!err) {
      (req as any).decoded = decoded;
      if (decoded.role !== 'admin') {
        throw new ErrorHandler(404, "Something's wrong");
      }
      next();
    }
  });
}

function checkToken(
  req: express.Request,
  _: express.Response,
  next: express.NextFunction,
) {
  let token = jwtHelper.cleanToken(req.headers['authorization']);
  if (!token) {
    throw new ErrorHandler(404, "Something's wrong");
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (!err) {
      (req as any).decoded = decoded;
      next();
    }
  });
}

export { checkTokenAdmin, checkToken };
