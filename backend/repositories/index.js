'use strict';

const userRepository = require('./userRepository');
const registerRepository = require('./registerRepository');
const postRepository = require('./postRepository');
const commentRepository = require('./commentRepository');
const communityRepository = require('./communityRepository');
const voteRepository = require('./voteRepository');

module.exports = {
  userRepository,
  registerRepository,
  postRepository,
  commentRepository,
  communityRepository,
  voteRepository,
};
