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

async function getAllTopics() {
  const pool = await database.getPool();
  const selectQuery = 'SELECT * FROM topic';
  const [allTopics] = await pool.query(selectQuery);

  return allTopics;
}

async function getAllTopicsUser(id) {
  const pool = await database.getPool();
  const topicsQuery = 'SELECT topicId, topicName FROM topic WHERE topicName IS NOT null';
  const [allTopics] = await pool.query(topicsQuery);

  const followedQuery = 'SELECT * FROM user_topic_follow WHERE userId = ? AND topicId = ? ';

  const followsQuery =
    'SELECT COUNT(t.topicId) AS follows FROM topic t LEFT OUTER JOIN user_topic_follow f ON t.topicId = f.topicId WHERE t.topicId = ? AND f.userId IS NOT null';

  let topicList = await Promise.all(
    allTopics.map(async (topic) => {
      try {
        const [followsTopics] = await pool.query(followsQuery, topic.topicId);
        const [followedTopics] = await pool.query(followedQuery, [id, topic.topicId]);

        let follows = (await followsTopics[0]) ? followsTopics[0].follows : 0;
        let followed = (await followedTopics[0]) ? true : false;
        return {
          id: topic.topicId,
          name: topic.topicName,
          follows: follows,
          followed: followed,
        };
      } catch (err) {
        console.log(err);
      }
    })
  );

  return topicList;
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
    'SELECT topicName, f.topicId FROM user_topic_follow f INNER JOIN  topic t ON t.topicId = f.topicId WHERE userId = ?';
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

async function getTopicImages(userId) {
  // SQL
  const pool = await database.getPool();

  const swapComTopic =
    'SELECT url, (SELECT t.topicName FROM topic t  WHERE t.topicId = f.topicId ) AS topicName  FROM topic_defaul_avatars a INNER JOIN user_topic_follow f ON f.topicId = a.topicId WHERE f.userId = ?';
  const [avatars] = await pool.query(swapComTopic, userId);

  return avatars;
}

module.exports = {
  createTopic,
  getAllTopics,
  getAllTopicsUser,
  getTopicById,
  getFollowedTopics,
  checkFollow,
  deleteTopic,
  getTopicImages,
};
