'use strict';

// Requires
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// Repositories
const { userRepository, registerRepository } = require('../repositories');

// Register
async function register(req, res) {
  try {
    const {
      name,
      email,
      password,
      topic1,
      topic2,
      topic3,
      community1,
      community2,
      community3,
      community4,
      community5,
    } = req.body;

    const registerSchema = Joi.object({
      name: Joi.string().regex(/^\S+$/).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(20).regex(/^\S+$/).required(),
      repeatPassword: Joi.ref('password'),
      topic1: Joi.number(),
      topic2: Joi.number(),
      topic3: Joi.number(),
      community1: Joi.number(),
      community2: Joi.number(),
      community3: Joi.number(),
      community4: Joi.number(),
      community5: Joi.number(),
    });

    await registerSchema.validateAsync(req.body);

    const userExist = await userRepository.getUserByEmail(email);

    if (userExist) {
      const error = new Error('Ya existe el usuario con este email');
      error.status = 409;

      throw error;
    }

    const topics = { topic1, topic2, topic3 };
    const communities = {
      community1,
      community2,
      community3,
      community4,
      community5,
    };

    const passwordHash = await bcrypt.hash(password, 10);
    const id = await userRepository.createUser(
      name,
      email,
      passwordHash,
      'user'
    );

    const userTopics = await registerRepository.registerTopics(topics, id);

    const userCommunities = await registerRepository.registerCommunities(
      communities,
      id
    );

    return res.send(
      `Se ha creado el usuario ${id} ha seguido los siguientes topics ${userTopics} y las comunidades ${userCommunities}`
    );
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(20).required(),
    });

    await schema.validateAsync({ email, password });

    // get user from DB
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      const error = new Error('No existe ningún usuario con ese email');
      error.code = 404;
      throw error;
    }

    // check password
    const isValidPassword = await bcrypt.compare(password, user.userPassword);

    if (!isValidPassword) {
      const error = new Error('La contraseña no es correcta');
      error.code = 401;
      throw error;
    }

    // generate jwt
    const tokenPayload = {
      id: user.userId,
      name: user.userName,
      role: user.userRole,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.send(token);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Home
// Logged Home - All ordered by votes on the last hour from your communities

// UnLogged Home - All ordered by votes on the last hour

// News
// Logged News - All ordered by time from your communities

// UnLogged News - All ordered by time

// Popular
// Logged Popular - All ordered by total votes of today from your communities

// UnLogged Popular - All ordered by total votes of today
module.exports = {
  register,
  login,
};
