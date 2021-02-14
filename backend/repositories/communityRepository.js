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

async function getAllCommunitiesUser(id) {
  const pool = await database.getPool();
  const communitiesQuery =
    'SELECT c.comName, c.comId FROM community c INNER JOIN user_topic_follow t ON c.comTopic = t.topicId WHERE t.userId = ? ';
  const [allCommunities] = await pool.query(communitiesQuery, id);

  const followedQuery = 'SELECT * FROM  user_community_follow WHERE userId = ? AND comId = ?';

  const followsQuery =
    'SELECT COUNT(c.comId) AS follows FROM community c LEFT OUTER JOIN user_community_follow f ON  c.comId = f.comId WHERE c.comId = ? AND f.userId IS NOT null';

  let communityList = await Promise.all(
    allCommunities.map(async (community) => {
      const [followsCommunity] = await pool.query(followsQuery, community.comId);
      const [followedCommunity] = await pool.query(followedQuery, [id, community.comId]);

      let follows = (await followsCommunity[0]) ? followsCommunity[0].follows : 0;
      let followed = (await followedCommunity[0]) ? true : false;

      return {
        id: community.comId,
        name: community.comName,
        follows: follows,
        followed: followed,
      };
    })
  );

  communityList.sort((a, b) => (b.follows > a.follows ? 1 : b.follows < a.follows ? -1 : 0));

  return communityList;
}

// Show community by id
async function getCommunityById(comId) {
  const pool = await database.getPool();
  const selectCom =
    'SELECT comId, comName, comBio, t.topicName AS mainTopic, t2.topicName AS secondTopic, comAvatar FROM community c INNER JOIN topic t ON t.topicId = c.comTopic INNER JOIN topic t2 ON t2.topicId = c.comSecTopic WHERE c.comId = ?';
  const [community] = await pool.query(selectCom, comId);

  return community;
}

// Show community by name
async function getCommunityByName(comName) {
  const pool = await database.getPool();
  const selectCom =
    'SELECT comId, comName, comBio, t.topicName AS mainTopic, t2.topicName AS secondTopic, comAvatar FROM community c INNER JOIN topic t ON t.topicId = c.comTopic INNER JOIN topic t2 ON t2.topicId = c.comSecTopic WHERE c.comName = ?';
  const [community] = await pool.query(selectCom, comName);

  return community;
}

// Show followed communities
async function getFollowedCommunities(userId) {
  // SQL
  const pool = await database.getPool();
  const selectQuery =
    'SELECT c.comId, comName, comBio, t.topicName AS mainTopic, t2.topicName AS secondTopic, comAvatar FROM community c INNER JOIN user_community_follow f ON c.comId = f.comId INNER JOIN topic t ON t.topicId = c.comTopic INNER JOIN topic t2 ON t2.topicId = c.comSecTopic WHERE userId=?';
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
  getAllCommunitiesUser,
  getCommunityById,
  getCommunityByName,
  getFollowedCommunities,
  getCreatedCommunities,
  getFollowedCommunitiesNames,
  deleteCommunityById,
  deleteCommunityByName,
  checkFollow,
};
