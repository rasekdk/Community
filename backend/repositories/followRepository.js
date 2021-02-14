'use strict';

// Imports
const database = require('../infrastructure/database');

// Topics
async function followTopic(topic, user) {
  // SQL
  const pool = await database.getPool();
  const follow = 'INSERT INTO user_topic_follow (topicId, userId) VALUES (?,?)';
  await pool.query(follow, [topic, user]);

  // Response
  return true;
}

async function unfollowTopic(topic, user) {
  // SQL
  const pool = await database.getPool();
  const follow = 'DELETE FROM user_topic_follow WHERE topicId = ? AND userId =?';
  await pool.query(follow, [topic, user]);

  // Response
  return true;
}

// Communities
async function followCommunity(com, user) {
  // SQL
  const pool = await database.getPool();
  const follow = 'INSERT INTO user_community_follow (comId, userId) VALUES (?,?)';
  await pool.query(follow, [com, user]);

  // Response
  return true;
}

async function unfollowCommunity(com, user) {
  // SQL
  const pool = await database.getPool();
  const follow = 'DELETE FROM user_community_follow WHERE comId = ? AND userId =?';
  await pool.query(follow, [com, user]);

  // Response
  return true;
}

module.exports = {
  followTopic,
  unfollowTopic,
  followCommunity,
  unfollowCommunity,
};
