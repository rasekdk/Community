'use strict';

// Imports
const database = require('../infrastructure/database');
const { createThread, singleThread } = require('./threadRepository');
const updateRepository = require('./updateRepository');

// Create Comment - CHECK
async function createComment(userId, postThreadId, commentContent) {
  // get required data
  const threadId = await createThread(userId);

  // SQL
  const pool = await database.getPool();
  const commentQuery = 'INSERT INTO comment (threadId, threadPost, commentContent) VALUES (?,?,?)';

  await pool.query(commentQuery, [threadId, postThreadId, commentContent]);

  // Response
  return threadId;
}

// Create SubComment - CHECK
async function createSubComment(userId, threadPost, threadComment, commentContent) {
  // get required data
  const threadId = await createThread(userId);

  // SQL
  const pool = await database.getPool();
  const commentQuery = 'INSERT INTO comment (threadId, threadPost, commentContent, threadComment) VALUES (?,?,?,?)';

  await pool.query(commentQuery, [threadId, threadPost, commentContent, threadComment]);

  // Response
  return threadId;
}

async function updateComment(userId, threadId, updateData) {
  // get requiredData
  let data = updateData;

  // Check Comment
  // Get thread
  const thread = await singleThread(threadId);

  if (!thread) {
    const error = new Error('El comentario que intentas editar no existe');
    error.code = 409;
    throw error;
  }

  const commentUserId = thread.userId;

  if (userId !== commentUserId) {
    const error = new Error('No tienes permiso para editar este comentario');
    error.code = 403;
    throw error;
  }

  // Check if current data and new data are different
  const currentData = await getCommentById(threadId);

  if (currentData[0].commentContent === data) {
    const error = Error('No se ha realizado ningún cambio');
    error.code = 409;
    throw error;
  }

  await updateRepository.updateComment(data, threadId);

  return true;
}

// Show Comment By Id - CHECK
async function getCommentById(threadId) {
  // SQL
  const pool = await database.getPool();
  const selectQuery =
    'SELECT * FROM comment c LEFT OUTER JOIN thread_update u  ON c.threadId = u.threadId WHERE c.threadId = ?';
  const [comment] = await pool.query(selectQuery, threadId);

  // Response
  return comment;
}

// Show Comments By Post Father Id - CHECK
async function getAllCommentsByPostId(threadId) {
  // SQL
  const pool = await database.getPool();
  const commentQuery = 'SELECT * FROM comment WHERE threadPost = ?';
  const [comments] = await pool.query(commentQuery, threadId);

  // Response
  return comments;
}

async function getCommentsByUser(userId) {
  // SQL
  const pool = await database.getPool();

  const selectQuery =
    'SELECT t.threadId, u.userName, c.commentContent, (SELECT SUM(v.voteType) FROM user_thread_vote v WHERE v.threadId = t.threadId) AS Votes FROM thread t INNER JOIN comment c ON t.threadId = c.threadId INNER JOIN user u ON t.userId = u.userId WHERE t.userId = ?';

  const [comments] = await pool.query(selectQuery, userId);

  return comments;
}

module.exports = {
  createComment,
  createSubComment,
  updateComment,
  getCommentById,
  getAllCommentsByPostId,
  getCommentsByUser,
};
