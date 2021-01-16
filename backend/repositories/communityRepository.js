'use strict';

// Imports
const database = require('../infrastructure/database');

// Create Community
async function createCommunity(userId, comData) {
  // list of forbiden communities names
  const regetNames = ['add', 'followed', 'created'];

  if (regetNames.includes(comData.comName)) {
    const error = new Error('El nombre de communidad no es un nombre válido');
    error.code = 400;
    throw error;
  }

  // Check community name
  const [comName] = await getCommunityByName(comData.comName);

  if (comName) {
    const error = new Error('Ya existe una comunidad con ese nombre');
    error.code = 409;
    throw error;
  }

  // Second topic
  let secondTopic;

  if (comData.comSecTopic === undefined || comData.comSecTopic === null) {
    secondTopic = 0;
  } else {
    secondTopic = comData.comSecTopic;
  }

  // SQL
  const pool = await database.getPool();
  const insertQuery =
    'INSERT INTO community (comCreator, comName, comBio, comTopic, comSecTopic, comAvatar) VALUES (?,?,?,?,?,?)';
  const [community] = await pool.query(insertQuery, [
    userId,
    comData.comName,
    comData.comBio,
    comData.comTopic,
    secondTopic,
    comData.comAvatar,
  ]);

  return community.insertId;
}

// Show communities
async function getAllCommunities() {
  // SQL
  const pool = await database.getPool();
  const selectQuery = 'SELECT * FROM community';
  const [allComunities] = await pool.query(selectQuery);

  // Response
  return allComunities;
}

// Show community by id
async function getCommunityById(comId) {
  const pool = await database.getPool();
  const selectCom =
    'SELECT comName, comBio, t.topicName AS mainTopic, t2.topicName AS secondTopic, comAvatar FROM community c INNER JOIN topic t ON t.topicId = c.comTopic INNER JOIN topic t2 ON t2.topicId = c.comSecTopic WHERE c.comId = ?';
  const [community] = await pool.query(selectCom, comId);

  console.log(community);

  return community;
}

// Show community by name
async function getCommunityByName(comName) {
  const pool = await database.getPool();
  const selectCom =
    'SELECT comName, comBio, t.topicName AS mainTopic, t2.topicName AS secondTopic, comAvatar FROM community c INNER JOIN topic t ON t.topicId = c.comTopic INNER JOIN topic t2 ON t2.topicId = c.comSecTopic WHERE c.comName = ?';
  const [community] = await pool.query(selectCom, comName);

  return community;
}

// Show followed communities
async function getFollowedCommunities(userId) {
  // SQL
  const pool = await database.getPool();
  const selectQuery =
    'SELECT comName, comBio, t.topicName AS mainTopic, t2.topicName AS secondTopic, comAvatar FROM community c INNER JOIN user_community_follow f ON c.comId = f.comId INNER JOIN topic t ON t.topicId = c.comTopic INNER JOIN topic t2 ON t2.topicId = c.comSecTopic WHERE userId=?';
  const communities = await pool.query(selectQuery, userId);

  // Response
  return communities;
}

async function getFollowedCommunitiesNames(userId) {
  // SQL
  const pool = await database.getPool();
  const selectQuery =
    'SELECT comName FROM community c INNER JOIN user_community_follow f ON c.comId = f.comId WHERE f.userId=?';
  const communities = await pool.query(selectQuery, userId);

  // Response
  return communities;
}

// Show created comunities
async function getCreatedCommunities(userId) {
  // SQL
  const pool = await database.getPool();
  const selectQuery =
    'SELECT comName, comBio, t.topicName AS mainTopic, t2.topicName AS secondTopic, comAvatar FROM community c INNER JOIN topic t ON t.topicId = c.comTopic INNER JOIN topic t2 ON t2.topicId = c.comTopic WHERE c.comCreator=?';
  const [comunities] = await pool.query(selectQuery, userId);

  // Response
  return comunities;
}

async function deleteCommunityById(comId, creator) {
  // SQL
  const pool = await database.getPool();

  const deleteQuery = 'DELETE FROM community WHERE comId = ?';
  await pool.query(deleteQuery, comId);
}

async function deleteCommunityByName(comName, creator) {
  // SQL
  const pool = await database.getPool();

  const deleteQuery = 'DELETE FROM community WHERE comName = ?';
  await pool.query(deleteQuery, comName);
}

async function checkFollow(comId, userId) {
  // SQL
  const pool = await database.getPool();
  const selectQuery = 'SELECT * FROM user_community_follow WHERE comId = ? AND userId = ?';
  const [follow] = await pool.query(selectQuery, [comId, userId]);

  return follow;
}

module.exports = {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  getCommunityByName,
  getFollowedCommunities,
  getCreatedCommunities,
  getFollowedCommunitiesNames,
  deleteCommunityById,
  deleteCommunityByName,
  checkFollow,
};
