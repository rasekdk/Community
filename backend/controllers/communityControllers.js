'use strict';

// Require
const Joi = require('joi');

// Imports
const { communityRepository, userRepository } = require('../repositories');

// Community
// Create community
async function createCommunity(req, res) {
  try {
    // Body
    const { comName, comBio, comTopic, comSecTopic, comAvatar } = req.body;
    const comData = { comName, comBio, comTopic, comSecTopic, comAvatar };
    // Params
    const tokenUserId = req.auth.id;

    // Validate
    const schema = Joi.object({
      comName: Joi.string().min(4).max(25).regex(/^\S+$/).required(),
      comBio: Joi.string().min(3).max(255),
      comTopic: Joi.number().positive().required(),
      comSecTopic: Joi.number().positive().allow(null),
      comAvatar: Joi.string().min(4).max(255),
    });

    await schema.validateAsync(comData);

    // SQL query
    const createdCommunity = await communityRepository.createCommunity(tokenUserId, comData);

    // SQL response data
    const [community] = await communityRepository.getCommunityById(createdCommunity);

    // Response
    res.send(community);
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
  createCommunity,
};
