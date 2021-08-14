'use strict';
// Require
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "CGS35F2fT5";

// Imports
const { topicRepository, followRepository } = require('../repositories');
const database = require('../infrastructure/database');

// Create  topic
async function createTopic(req, res) {
  try {
    //body
    const topicName = req.body.topicName;

    //  Validate
    const schema = Joi.string().min(2).max(25).regex(/^\S+$/).required();

    await schema.validateAsync(topicName);

    // SQL
    const createdTopic = await topicRepository.createTopic(topicName);

    // SQL response data
    const [topic] = await topicRepository.getTopicById(createdTopic);

    res.send(`Has creado el topic ${topic.topicName}`);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Get topics
async function getTopics(req, res) {
  try {
    const token = req.headers.auth;

    let topics;
    if (!token) {
      topics = await topicRepository.getAllTopics();
    } else {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const { id } = decodedToken;
      topics = await topicRepository.getAllTopicsUser(id);
    }

    res.send(topics);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function getTopicById(req, res) {
  try {
    const id = req.params.id;
    const [topic] = await topicRepository.getTopicById(id);

    res.send(topic);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Follow topics
async function followTopic(req, res) {
  try {
    // Paramas
    const userTokenId = req.auth.id;
    const topicId = req.params.id;

    // Check community
    const [topic] = await topicRepository.getTopicById(topicId);

    if (!topic) {
      const error = new Error('El topic que intentas seguir no existe');
      error.code = 409;

      throw error;
    }

    // Check follow
    const follow = await topicRepository.checkFollow(topicId, userTokenId);

    if (follow[0]) {
      await followRepository.unfollowTopic(topicId, userTokenId);
      res.send(await topicRepository.getAllTopicsUser(userTokenId));
    } else {
      await followRepository.followTopic(topicId, userTokenId);
      res.send(await topicRepository.getAllTopicsUser(userTokenId));
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Delete topic
async function deleteTopic(req, res) {
  try {
    // Params
    const tokenUser = req.auth;
    const topicId = req.params.id;

    // Validate
    const topicIdSchema = Joi.required();

    await topicIdSchema.validateAsync(topicId);

    const [topic] = await topicRepository.getTopicById(topicId);
    if (!topic) {
      const error = new Error('El topic que intentas eliminar no existe');
      error.code = 404;
      throw error;
    }

    // SQL
    await topicRepository.deleteTopic(topicId, tokenUser);

    // Response
    res.send(`El topic ${topicId} ha sido eliminado`);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function getTopicImages(req, res) {
  try {
    const token = req.headers.auth;

    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { id } = decodedToken;

    const avatars = await topicRepository.getTopicImages(id);

    res.send(avatars);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function getFollowedTopics(req, res) {
  try {
    const token = req.auth.id;

    const topics = await topicRepository.getFollowedTopics(token);

    res.send(topics);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = {
  createTopic,
  getTopics,
  getTopicById,
  followTopic,
  deleteTopic,
  getTopicImages,
  getFollowedTopics,
};
