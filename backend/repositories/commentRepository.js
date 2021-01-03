'use strict';

const database = require('../infrastructure/database');
const createThread = require('./threadRepository');

async function createComment(userId, postId, commentContent, commentId) {
  // get required data
  const threadId = await createThread(userId);
  const pool = await database.getPool();

  if (commentId === undefined) {
    // DB scripts
    const commentQuery =
      'INSERT INTO comment (threadId, threadPost, commentContent) VALUES (?,?,?) ';
    const [comment] = await pool.query(commentQuery, [
      threadId,
      postId,
      commentContent,
    ]);

    return comment.insertId;
  } else {
    const commentQuery =
      'INSERT INTO comment (threadId, threadPost, commentContent, threadComment) VALUES (?,?,?,?) ';
    const [comment] = await pool.query(commentQuery, [
      threadId,
      postId,
      commentContent,
      commentId,
    ]);

    return comment.insertId;
  }
}

async function getCommentById(commentId) {
  const pool = await database.getPool();
  const selectQuery = 'SELECT * FROM comment WHERE commentId = ?';
  return await pool.query(selectQuery, commentId);
}

module.exports = {
  createComment,
  getCommentById,
};
