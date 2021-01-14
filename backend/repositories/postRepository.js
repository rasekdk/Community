'use strict';

const database = require('../infrastructure/database');

const { createThread, singleThread } = require('./threadRepository');
const commentRepository = require('./commentRepository');
const updateRepository = require('./updateRepository');

// Create post
async function createPost(userId, postData) {
  // get required data
  const thread = await createThread(userId);

  // DB scripts
  const pool = await database.getPool();
  const postQuery = 'INSERT INTO post (threadId, comId, postTitle, postContent, postType) VALUES (?,?,?,?,?)';
  const [post] = await pool.query(postQuery, [
    thread,
    postData.comId,
    postData.postTitle,
    postData.postContent,
    postData.postType,
  ]);

  return thread;
}

// Get post by id
async function getPostById(threadId) {
  // SQL
  const pool = await database.getPool();
  const selectQuery =
    'SELECT p.threadId, u.userName, p.postTitle, p.postContent, p.postType, t.threadDate,  COUNT(c.commentId) AS comentarios,   cm.comName, cm.comId, up.updateDate FROM post p   INNER JOIN thread t  ON p.threadId = t.threadId   INNER JOIN community cm  ON p.comId = cm.comId INNER JOIN user u ON t.userId = u.userId LEFT OUTER JOIN thread_update up   ON p.threadId = up.threadId  LEFT OUTER JOIN comment c  ON p.threadId = c.threadPost  LEFT OUTER JOIN comment c2  ON c.threadId = c2.threadComment  WHERE p.threadId = ? GROUP BY t.threadId';
  const [post] = await pool.query(selectQuery, threadId);

  // Respone
  return post;
}

// Update post
async function updatePost(userId, threadId, updateData) {
  // get requiredData
  let data = updateData;

  // Check Post
  // Get thread
  const thread = await singleThread(threadId);

  if (!thread) {
    const error = new Error('El post que intentas editar no existe');
    error.code = 409;
    throw error;
  }

  const postUserId = thread.userId;

  if (userId !== postUserId) {
    const error = new Error('No tienes permiso para editar este post');
    error.code = 403;
    throw error;
  }

  // Get no updated Data
  const [replaceData] = await getPostById(threadId);

  // Replace udefinded data with no updated data
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) {
      data[key] = replaceData[key];
    }
  });

  await updateRepository.updatePost(data, threadId);

  return true;
}

// Get full thread (post + comments + subcommnets)
async function getThread(threadId) {
  // SQL
  const pool = await database.getPool();
  const selectQuery =
    'SELECT t.threadId, p.postId, u.userName, p.postTitle, p.postContent, cm.comName, p.postType, t.threadDate, SUM(v.voteType) AS votes, (SELECT COUNT(threadPost) FROM comment  WHERE threadPost = ?) AS commetCount FROM post p LEFT OUTER JOIN thread_update up ON p.threadId = up.threadId   INNER JOIN thread t  ON p.threadId = t.threadId  INNER JOIN community cm ON p.comId = cm.comId INNER JOIN user u ON t.userId = u.userId LEFT OUTER JOIN user_thread_vote v ON p.threadId = v.threadId WHERE p.threadId = ? GROUP BY v.threadId';
  let [data] = await pool.query(selectQuery, [threadId, threadId]);

  const mainComments = await commentRepository.getAllCommentsByPostId(threadId);

  data[0].comments = [];

  let jsonData = data[0].comments;

  for (let comment in mainComments) {
    if (mainComments[comment].threadComment === null) {
      jsonData.push(mainComments[comment]);
    } else {
      const index = jsonData.findIndex((i) => i.threadId === mainComments[comment].threadComment);

      if (!jsonData[index].comment) {
        jsonData[index].comment = [];
      }
      jsonData[index].comment.push(mainComments[comment]);
    }
  }

  return data;
}

// Delete thread
async function deleteThread(userId, threadId) {
  const pool = await database.getPool();

  const selectQuery = 'SELECT userId FROM thread WHERE threadId =?';
  const [threadData] = await pool.query(selectQuery, threadId);

  if (!threadData[0]) {
    const error = new Error('El hilo que intentas borrar no existe');
    error.code = 409;
    throw error;
  }

  const threadUserId = threadData[0].userId;

  if (userId !== threadUserId) {
    const error = new Error('No tienes permiso para borrar este hilo');
    error.code = 403;
    throw error;
  }

  const deleteQuery = 'DELETE FROM thread WHERE threadId = ?';
  await pool.query(deleteQuery, threadId);
}

module.exports = {
  createPost,
  getPostById,
  updatePost,
  getThread,
  deleteThread,
};
