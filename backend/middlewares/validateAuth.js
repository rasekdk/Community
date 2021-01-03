'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
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

module.exports = validateAuth;
