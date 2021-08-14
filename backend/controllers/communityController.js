'use strict';

// Require
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const JWT_SECRET  = "CGS35F2fT5";

// Imports
const {
  communityRepository,
  followRepository,
  imageRepository,
  postRepository,
  updateRepository,
} = require('../repositories');

// Create community
async function createCommunity(req, res) {
  try {
    // Body
    const { comName, comBio, comTopic, comSecTopic, comAvatar } = req.body;
    const comData = { comName, comBio, comTopic, comSecTopic };
    // Params
    const tokenUserId = req.auth.id;

    // Validate
    const schema = Joi.object({
      comName: Joi.string().min(2).max(25).regex(/^\S+$/).required(),
      comBio: Joi.string().min(3).max(255),
      comTopic: Joi.number().positive().required(),
      comSecTopic: Joi.number().positive().allow(0),
    });

    let fileName;

    if (req.files) {
      const { comAvatar } = req.files;

      fileName = await imageRepository.editSavePhoto(comAvatar, 'communities', 200, 200);
    }

    await schema.validateAsync(comData);

    // list of forbiden communities names
    const regetNames = ['add', 'followed', 'created'];

    if (regetNames.includes(comName)) {
      const err = 'invalid name';
      const error = new Error(err);
      error.code = 409;
      throw error;
    }

    const [usedName] = await communityRepository.getCommunityByName(comName);

    if (usedName) {
      const err = 'used com';
      const error = new Error(err);
      error.status = 409;

      throw error;
    }

    // SQL query
    const createdCommunity = await communityRepository.createCommunity(tokenUserId, comData, fileName);

    await followRepository.followCommunity(createdCommunity, tokenUserId);

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

    let community;

    // For id = number => getCommunityById / For id = string => getCommunitybyName
    if (!isNaN(id)) {
      [community] = await communityRepository.getCommunityById(id);
    } else if (isNaN(id)) {
      [community] = await communityRepository.getCommunityByName(id);
    }

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
    } else {
      await followRepository.followCommunity(comId, userTokenId);
    }
    res.send(await communityRepository.getAllCommunitiesUser(userTokenId));
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

async function editCommunity(req, res) {
  try {
    // Paramas
    const userTokenId = req.auth.id;
    const { comName, comBio, comTopic, comSecTopic, comAvatar } = req.body;

    let body = { comName, comBio, comTopic, comSecTopic, comAvatar };

    const comNameId = req.params.id;

    const [community] = await communityRepository.getCommunityByName(comNameId);

    if (community.comCreator !== userTokenId) {
      const err = 'no creator';
      const error = new Error(err);
      error.code = 409;
      throw error;
    }

    let fileName;

    if (req.files) {
      const { comAvatar } = req.files;

      fileName = await imageRepository.editSavePhoto(comAvatar, 'communities', 200, 200);

      body.comAvatar = fileName;
    }

    await updateRepository.updateCommunity(comNameId, body);
    const newCommunity = await communityRepository.getCommunityByName(comNameId);

    res.send(newCommunity);
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
    // Params
    const token = req.auth;

    const communities = await communityRepository.getCreatedCommunities(token.id);

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

async function updateAvatar(req, res) {
  try {
    // Params
    const comName = req.params.id;
    const token = req.auth;

    const [checkCommunity] = await communityRepository.getCommunityByName(comName);

    if (token.name !== checkCommunity.comCreator) {
      const error = new Error('no creator');
      error.code = 409;
      throw error;
    }

    const { comAvatar } = req.files;

    const fileName = await imageRepository.editSavePhoto(comAvatar, 'communities', 200, 200);

    await communityRepository.updateAvatar(fileName, comName);

    const [community] = await communityRepository.getCommunityByName(comName);

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

async function updateBio(req, res) {
  try {
    // Params
    const comName = req.params.id;
    const token = req.auth;

    const comBio = req.body.comBio;

    console.log(comBio);

    const [checkCommunity] = await communityRepository.getCommunityByName(comName);

    if (token.name !== checkCommunity.comCreator) {
      const error = new Error('no creator');
      error.code = 409;
      throw error;
    }

    await communityRepository.updateBio(comBio, checkCommunity.comName);

    const [community] = await communityRepository.getCommunityByName(comName);

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
  getCommunities,
  deleteCommunity,
  followCommunity,
  getcommunityById,
  getFollowedCommunities,
  editCommunity,
  getCreatedCommunities,
  updateAvatar,
  updateBio,
};
