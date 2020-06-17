const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middlewares
const { ErrorHandler } = require('../middlewares/errorHandler.middleware');

// Helpers
const { cleanToken } = require('../helpers/jwt.helper');

function checkTokenAdmin(req, _, next) {
  const token = cleanToken(req.headers['authorization']);
  if (!token) {
    throw new ErrorHandler(404, "Something's wrong");
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err) {
      req.decoded = decoded;
      if (decoded.role !== 'admin') {
        throw new ErrorHandler(404, "Something's wrong");
      }
      next();
    }
  });
}

function checkToken(req, _, next) {
  let token = cleanToken(req.headers['authorization']);
  if (!token) {
    throw new ErrorHandler(404, "Something's wrong");
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err) {
      req.decoded = decoded;
      next();
    }
  });
}

module.exports = {
  checkTokenAdmin,
  checkToken,
};
