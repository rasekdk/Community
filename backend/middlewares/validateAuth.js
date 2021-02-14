'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    const token = req.headers.auth;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { id, name, role } = decodedToken;

    req.auth = { id, name, role };
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.send('Tienes que estar loggeado');
  }
}

function checkIfNeedValidation(req, res, next) {
  try {
    const token = req.headers.auth;

    if (token) {
      validateAuth(req, res, next);
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(409);
    res.send(err.message);
  }
}

function validateAdmin(req, res, next) {
  try {
    const token = req.headers.auth;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { id, name, role } = decodedToken;

    req.auth = { id, name, role };

    if (req.auth.role !== 'admin') {
      const error = new Error('No tienes permiso para hacer esto');
      error.code = 409;

      throw error;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.send('Solo los admins pueden hacer esto');
  }
}

module.exports = {
  validateAuth,
  validateAdmin,
  checkIfNeedValidation,
};
