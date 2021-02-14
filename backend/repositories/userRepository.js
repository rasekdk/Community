'use strict';

const commentRepository = require('./commentRepository');
const postRepository = require('./postRepository');
const communityRepository = require('./communityRepository');
const topicRepository = require('./topicRepository');
const updateRepository = require('./updateRepository');
const database = require('../infrastructure/database');

// User
// Create new user - CHECK
async function createUser(nombre, email, password, role) {
  // SQL - Add a new user
  const pool = await database.getPool();
  const insertQuery = 'INSERT INTO user (userName, userEmail, userPassword, userRole) VALUES (?, ?, ?, ?)';
  const [created] = await pool.query(insertQuery, [nombre, email, password, role]);

  // Response
  return created.insertId;
}

// Get user by email - CHECK
async function getUserByEmail(email) {
  // SQL
  const pool = await database.getPool();
  const query = 'SELECT * FROM user WHERE userEmail = ?';
  const [users] = await pool.query(query, email);

  return users[0];
}

// Get user by name - CHECK
async function getUserByName(name) {
  // SQL
  const pool = await database.getPool();
  const query = 'SELECT * FROM user WHERE userName = ?';
  const [users] = await pool.query(query, name);

  // Response
  return users[0];
}

// Get user Page
async function getUserPage(name) {
  // SQL
  // SQL
  const pool = await database.getPool();
  const query = 'SELECT userId, userName, userAvatar, userBio, userRole FROM user WHERE userName = ?';
  const [user] = await pool.query(query, name);

  const json = user[0];

  const userName = json.userName;

  json.posts = [];
  json.comments = [];
  json.createdCommunities = [];
  json.followCommunities = [];
  json.followTopics = [];

  const posts = await postRepository.getPostsByUser(userName);
  const comments = await commentRepository.getCommentsByUser(userName);
  const createdCommunities = await communityRepository.getCreatedCommunities(userName);
  const [followCommunities] = await communityRepository.getFollowedCommunities(userName);
  const followTopics = await topicRepository.getFollowedTopics(userName);

  json.comments = comments.length;
  json.posts = posts.length;
  json.createdCommunities = createdCommunities;
  json.followCommunities = followCommunities;
  json.followTopics = followTopics;
  return json;
}

// Get user by Id - CHECK
async function getUserById(userId) {
  // SQL
  const pool = await database.getPool();
  const query = 'SELECT * FROM user WHERE userId = ?';
  const [user] = await pool.query(query, userId);

  // Response
  return user[0];
}

// Update user
async function updateUser(tokenUserId, userName, updateData) {
  let data = updateData;

  // Get no updated Data
  const replaceData = await getUserByName(userName);

  // Check user

  if (replaceData.userId !== tokenUserId) {
    const error = new Error('No tienes permiso para editar este usuario');
    error.code = 403;
    throw error;
  }

  // Replace udefinded data with no updated data
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) {
      data[key] = replaceData[key];
    }
  });

  await updateRepository.updateUser(data, replaceData.userId);

  const user = await getUserPage(data.userName);

  // Response
  return user;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserByName,
  getUserById,
  getUserPage,
  updateUser,
};
