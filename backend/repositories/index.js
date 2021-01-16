'use strict';

const userRepository = require('./userRepository');
const registerRepository = require('./registerRepository');
const postRepository = require('./postRepository');
const commentRepository = require('./commentRepository');
const communityRepository = require('./communityRepository');
const voteRepository = require('./voteRepository');
const updateRepository = require('./updateRepository');
const topicRepository = require('./topicRepository');
const followRepository = require('./followRepository');

module.exports = {
  userRepository,
  registerRepository,
  postRepository,
  commentRepository,
  communityRepository,
  voteRepository,
  updateRepository,
  topicRepository,
  followRepository,
};
