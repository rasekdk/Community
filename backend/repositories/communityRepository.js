'use strict';

const database = require('../infrastructure/database');

async function getCommunityById(comId) {
  const pool = await database.getPool();
  const selectCom = 'SELECT * FROM community WHERE comId=?';
  const [community] = await pool.query(selectCom, comId);

  return community;
}

async function getAllCommunities() {
  const pool = await database.getPool();
  const selectQuery = 'SELECT * FROM community';
  const [allComunities] = await pool.query(selectQuery);

  return allComunities;
}

async function createCommunity(userId, comData) {
  const pool = await database.getPool();
  const selectQuery = 'SELECT comName FROM community';
  const [comNames] = await pool.query(selectQuery);

  for (let name of Object.values(comNames)) {
    if (name.comName === comData.comName) {
      const error = new Error('Ya existe una comunidad con este nombre');
      error.code = 409;
      throw error;
    }
  }

  const insertQuery =
    'INSERT INTO community (comCreator, comName, comBio, comTopic, comSecTopic, comAvatar) VALUES (?,?,?,?,?,?)';
  const [community] = await pool.query(insertQuery, [
    userId,
    comData.comName,
    comData.comBio,
    comData.comTopic,
    comData.comSecTopic,
    comData.comAvatar,
  ]);

  return await getCommunityById(community.insertId);
}

async function getFollowedCommunities(userId) {
  const pool = await database.getPool();
  const selectQuery =
    'SELECT comName, comBio, t.topicName AS mainTopic, t2.topicName AS secondTopic, comAvatar FROM community c INNER JOIN user_community_follow f ON c.comId = f.comId INNER JOIN topic t ON t.topicId = c.comTopic INNER JOIN topic t2 ON t2.topicId = c.comSecTopic WHERE userId=?';
  const [comunity] = await pool.query(selectQuery, userId);

  return comunity;
}

async function getCreatedCommunities(userId) {
  const pool = await database.getPool();
  const selectQuery =
    'SELECT comName, comBio, t.topicName AS mainTopic, t2.topicName AS secondTopic, comAvatar FROM community c INNER JOIN topic t ON t.topicId = c.comTopic INNER JOIN topic t2 ON t2.topicId = c.comTopic WHERE c.comCreator=?';
  const [comunity] = await pool.query(selectQuery, userId);

  return comunity;
}

module.exports = {
  getAllCommunities,
  createCommunity,
  getFollowedCommunities,
  getCreatedCommunities,
};
