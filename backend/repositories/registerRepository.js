'use strict';

// Imports
const database = require('../infrastructure/database');
const followRepository = require('./followRepository');
const topicRepository = require('./topicRepository');
const communityRepository = require('./communityRepository');

// follow topics when user register
async function followTopicsOnRegister(topics, userId) {
  // Loop the SQL follow to topic
  for (let topic of Object.values(topics)) {
    if (topic === undefined) {
      break;
    }
    // Follow the topic
    await followRepository.followTopic(topic, userId);
  }

  // Response
  return await topicRepository.getFollowedTopics(userId);
}

// follow communities when user register
async function followCommunitiesOnRegister(communities, userId) {
  // Loop the SQL follow to community
  for (let community of Object.values(communities)) {
    if (community === undefined) {
      break;
    }
    // Follow de community
    await followRepository.followCommunity(community, userId);
  }

  // Response
  return await communityRepository.getFollowedCommunitiesNames(userId);
}

module.exports = { followTopicsOnRegister, followCommunitiesOnRegister };
