'use strict';

// Imports
const database = require('../infrastructure/database');
const getDate = require('./getDate');
const commentRepository = require('./commentRepository');
const userRepository = require('./userRepository');

// Log the updateData on DB - CHECK
async function addUpdate(threadId) {
  // get required data
  const time = getDate();

  // SQL
  const pool = await database.getPool();

  // Check if thread is already update
  const checkIfUpdated = 'SELECT * FROM thread_update WHERE threadId = ?';
  const [updateExist] = await pool.query(checkIfUpdated, threadId);

  if (updateExist[0]) {
    // If the thread was update earlier, replace the new update date
    const updateLog = 'UPDATE thread_update SET updateDate = ? WHERE threadId= ?';
    await pool.query(updateLog, [time, threadId]);
  } else {
    // If the thread wasnt update earlier, create new update date
    const updateLog = 'INSERT INTO thread_update (threadId, updateDate) VALUES (?, ?)';
    await pool.query(updateLog, [threadId, time]);
  }
}

// Post -CHECK
async function updatePost(data, threadId) {
  // SQL
  const pool = await database.getPool();

  // Update the post
  const updateQuery = 'UPDATE post SET comId = ?, postTitle = ? , postContent = ?, postType = ? WHERE threadId = ?';
  await pool.query(updateQuery, [data.comId, data.postTitle, data.postContent, data.postType, threadId]);

  // Log the updateData on DB
  await addUpdate(threadId);

  // Response
  return true;
}

// Comment - CHECK
async function updateComment(data, threadId) {
  // get required data
  const time = getDate();

  // SQL
  const pool = await database.getPool();

  // Update comment
  const updateQuery = 'UPDATE comment SET commentContent = ? WHERE threadId = ?';
  await pool.query(updateQuery, [data, threadId]);

  // Log the updateData on DB
  await addUpdate(threadId);

  // Response
  return true;
}

// User
async function updateUser(data, userId) {
  // SQL
  const pool = await database.getPool();

  // Update comment
  const updateQuery =
    'UPDATE user u SET u.userName = ?, u.userEmail = ?, u.userPassword = ?, u.userAvatar = ?, u.userBio = ?, u.userColor =? WHERE userId = ?';
  await pool.query(updateQuery, [
    data.userName,
    data.userEmail,
    data.userPassword,
    data.userAvatar,
    data.userBio,
    data.userColor,
    userId,
  ]);

  return true;
}

async function updateAvatar(fileName, userId) {
  // SQL
  const pool = await database.getPool();

  // Update comment
  const updateQuery = 'UPDATE user u SET u.userAvatar = ? WHERE userId = ?';
  await pool.query(updateQuery, [fileName, userId]);
}

// Export
module.exports = {
  addUpdate,
  updatePost,
  updateComment,
  updateUser,
  updateAvatar,
};
