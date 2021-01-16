'use strict';

// Require
const Joi = require('joi');
const { topicController } = require('.');

// Imports
const { topicRepository, followRepository } = require('../repositories');
const database = require('../infrastructure/database');
const { func } = require('joi');

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
    const pool = database.getPool();
    const selectQuery = 'SELECT topicName FROM topic';
    const [topics] = pool.query(selectQuery);

    console.log(topics);
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
      const error = new Error('Ya sigues el topic');
      error.code = 409;

      throw error;
    }

    await followRepository.followTopic(topicId, userTokenId);

    res.send(`Has seguido el topic ${topicId}`);
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

module.exports = {
  createTopic,
  getTopics,
  followTopic,
  deleteTopic,
};
