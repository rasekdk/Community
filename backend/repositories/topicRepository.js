'use strict';

// Imports
const database = require('../infrastructure/database');

// Create Topic
async function createTopic(topicName) {
  // SQL
  const pool = await database.getPool();
  const createQuery = 'INSERT INTO topic topicName = ?';
  const [newTopic] = await pool.query(createQuery, topicName);

  // Response
  return newTopic;
}

// Get followed topics
async function getFollowedTopics(user) {
  // SQL
  const pool = await database.getPool();
  const follows =
    'SELECT topicName FROM user_topic_follow f INNER JOIN  topic t ON t.topicId = f.topicId WHERE userId = ?';
  const [topics] = await pool.query(follows, user);

  // Response
  return topics;
}

module.exports = { getFollowedTopics, createTopic };
