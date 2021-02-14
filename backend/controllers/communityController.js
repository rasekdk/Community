'use strict';

// Require
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Imports
const { communityRepository, followRepository } = require('../repositories');

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
      comName: Joi.string().min(2).max(25).regex(/^\S+$/).required(),
      comBio: Joi.string().min(3).max(255),
      comTopic: Joi.number().positive().required(),
      comSecTopic: Joi.number().positive().allow(null),
      comAvatar: Joi.string().min(4).max(255),
    });

    await schema.validateAsync(comData);

    // SQL query
    const createdCommunity = await communityRepository.createCommunity(tokenUserId, comData);

    // SQL response data
    const community = await communityRepository.getCommunityById(createdCommunity);

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

// Get communities
async function getCommunities(req, res) {
  try {
    // Params
    const token = req.headers.auth;

    let communities;

    if (!token) {
      communities = await communityRepository.getAllCommunities();
    } else {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const { id } = decodedToken;
      communities = await communityRepository.getAllCommunitiesUser(id);
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

async function getcommunityById(req, res) {
  try {
    // Params
    const id = req.params.id;

    // For id = number => getCommunityById / For id = string => getCommunitybyName / For id = undefined => getAllCommunities
    if (id === undefined) {
      res.send(await getCommunities(req, res));
    } else if (!isNaN(id)) {
      res.send(await communityRepository.getCommunityById(id));
    } else if (isNaN(id)) {
      res.send(await communityRepository.getCommunityByName(id));
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

// Delete community
async function deleteCommunity(req, res) {
  try {
    // Params
    const tokenUser = req.auth;
    const comId = req.params.id;

    // Validate
    const comIdSchema = Joi.required();

    await comIdSchema.validateAsync(comId);

    const [community] = await communityRepository.getCommunityById(comId);
    if (!community) {
      const error = new Error('La communidad que intentas eliminar no existe');
      error.code = 404;
      throw error;
    }

    if (community.comCreator !== tokenUser.id && tokenUser.role !== 'admin') {
      const error = new Error('Solo el creador de la página puede borrar la comunidad');
      error.code = 409;
      throw error;
    }

    // SQL
    await communityRepository.deleteCommunityById(comId, tokenUser);

    // Response
    res.send(`La comunidad ${comId} ha sido eliminado`);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Follow community
async function followCommunity(req, res) {
  try {
    // Paramas
    const userTokenId = req.auth.id;
    const comId = req.params.id;

    // Check community
    const [community] = await communityRepository.getCommunityById(comId);

    if (!community) {
      const error = new Error('La comunidad que intentas seguir no existe');
      error.code = 409;

      throw error;
    }

    // Check follow
    const follow = await communityRepository.checkFollow(comId, userTokenId);

    if (follow[0]) {
      await followRepository.unfollowCommunity(comId, userTokenId);
      res.send(await communityRepository.getAllCommunitiesUser(userTokenId));
    } else {
      await followRepository.followCommunity(comId, userTokenId);
      res.send(await communityRepository.getAllCommunitiesUser(userTokenId));
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

async function getFollowedCommunities(req, res) {
  try {
    // Paramas
    const userTokenId = req.auth.id;

    const [communities] = await communityRepository.getFollowedCommunities(userTokenId);

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
module.exports = {
  createCommunity,
  getCommunities,
  deleteCommunity,
  followCommunity,
  getcommunityById,
  getFollowedCommunities,
};
