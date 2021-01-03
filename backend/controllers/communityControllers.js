'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { communityRepository, userRepository } = require('../repositories');

async function getAllCommunities(req, res) {
  try {
    const communities = await communityRepository.getAllCommunities();

    res.send(communities);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function createCommunity(req, res) {
  try {
    const { comName, comBio, comTopic, comSecTopic, comAvatar } = req.body;
    const tokenUserId = req.auth.id;

    const schema = Joi.object({
      comName: Joi.string().min(4).max(25).regex(/^\S+$/).required(),
      comBio: Joi.string().min(4).max(255),
      comTopic: Joi.number().positive().required(),
      comSecTopic: Joi.number().positive(),
      comAvatar: Joi.string().min(4).max(255),
    });

    await schema.validateAsync({
      comName,
      comBio,
      comTopic,
      comSecTopic,
      comAvatar,
    });

    const comData = { comName, comBio, comTopic, comSecTopic, comAvatar };

    const createCommunity = await communityRepository.createCommunity(
      tokenUserId,
      comData
    );

    res.send(createCommunity);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function getFollowedCommunities(req, res) {
  try {
    const tokenUserId = req.auth.id;

    const queryUserId = req.query.userId;

    let userId;

    if (queryUserId !== undefined) {
      userId = queryUserId;
    } else {
      userId = tokenUserId;
    }

    const userExist = await userRepository.userExist(userId);

    if (!userExist) {
      const error = new Error('El ususario no existe');
      error.code = 404;

      throw error;
    }

    const [communities] = await communityRepository.getFollowedCommunities(
      userId
    );

    if (!communities) {
      if (userId === tokenUserId) {
        const error = new Error('No sigues a ninguna comunidad');
        error.code = 404;
        throw error;
      }
      const error = new Error('El usuario no sigue ninguna comunidad');
      error.code = 404;
      throw error;
    }

    res.send(communities);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function getCreatedCommunities(req, res) {
  try {
    const tokenUserId = req.auth.id;

    const queryUserId = req.query.userId;

    let userId;

    if (queryUserId !== undefined) {
      userId = queryUserId;
    } else {
      userId = tokenUserId;
    }

    const userExist = await userRepository.userExist(userId);

    if (!userExist) {
      const error = new Error('El ususario no existe');
      error.code = 404;

      throw error;
    }

    const [communities] = await communityRepository.getCreatedCommunities(
      userId
    );

    if (!communities) {
      if (userId === tokenUserId) {
        const error = new Error('No sigues a ninguna comunidad');
        error.code = 404;
        throw error;
      }
      const error = new Error('El usuario no sigue ninguna comunidad');
      error.code = 404;
      throw error;
    }

    res.send(communities);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function getCommunityByName(req, res) {}

module.exports = {
  getAllCommunities,
  createCommunity,
  getFollowedCommunities,
  getCreatedCommunities,
};
