'use strict';

// Imports
const database = require('../infrastructure/database');

// Create Topic
async function createTopic(topicName) {
  // Check community name
  const [topic] = await getTopicByName(topicName);

  if (topic) {
    const error = new Error('Ya existe una topic con ese nombre');
    error.code = 409;
    throw error;
  }

  // SQL
  const pool = await database.getPool();
  const createQuery = 'INSERT INTO topic (topicName) VALUES(?)';
  const [newTopic] = await pool.query(createQuery, topicName);

  // Response
  return newTopic.insertId;
}

async function getTopicById(topicId) {
  // SQL
  const pool = await database.getPool();
  const follows = 'SELECT topicName FROM topic WHERE topicId = ?';
  const [topic] = await pool.query(follows, topicId);

  // Response
  return topic;
}

async function getTopicByName(topicName) {
  // SQL
  const pool = await database.getPool();
  const follows = 'SELECT * FROM topic WHERE topicName = ?';
  const [topic] = await pool.query(follows, topicName);

  // Response
  return topic;
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

// Check follow
async function checkFollow(topicId, userId) {
  // SQL
  const pool = await database.getPool();
  const selectQuery = 'SELECT * FROM user_topic_follow WHERE topicId = ? AND userId = ?';
  const [follow] = await pool.query(selectQuery, [topicId, userId]);

  return follow;
}

async function deleteTopic(topicId) {
  // SQL
  const pool = await database.getPool();

  const swapComTopic = 'UPDATE community SET comTopic = 0 WHERE comTopic = ?';
  await pool.query(swapComTopic, topicId);

  const deleteQuery = 'DELETE FROM topic WHERE topicId = ?';
  await pool.query(deleteQuery, topicId);
}

module.exports = {
  getFollowedTopics,
  createTopic,
  getTopicById,
  checkFollow,
  deleteTopic,
};
