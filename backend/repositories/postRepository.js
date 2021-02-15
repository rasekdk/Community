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
    'SELECT p.threadId, u.userName, u.userId, u.userAvatar, p.postTitle, p.postContent, p.postType, t.threadDate, COUNT(c.threadId) AS comments,   cm.comName, cm.comId, up.updateDate, (SELECT SUM(v.voteType) FROM user_thread_vote v WHERE v.threadId = p.threadID) AS votes, (SELECT v2.voteType FROM user_thread_vote v2 WHERE p.threadId =  v2.threadId AND v2.userId = 154) AS voted FROM post p INNER JOIN thread t  ON p.threadId = t.threadId INNER JOIN community cm  ON p.comId = cm.comId JOIN user u ON t.userId = u.userId LEFT OUTER JOIN thread_update up ON p.threadId = up.threadId LEFT OUTER JOIN comment c  ON p.threadId = c.threadPost LEFT OUTER JOIN comment c2 ON c.threadId = c2.threadComment WHERE p.threadId = ? GROUP BY p.threadId';
  const [post] = await pool.query(selectQuery, threadId);

  // Respone
  return post;
}

async function getPostComments(threadId) {
  let data = [];
  // console.log(data);

  const mainComments = await commentRepository.getAllCommentsByPostId(threadId);

  data.comments = [];

  for (let comment in mainComments) {
    if (mainComments[comment].threadComment === null) {
      data.push(mainComments[comment]);
    } else {
      const index = data.findIndex((i) => i.threadId === mainComments[comment].threadComment);

      if (!data[index].comment) {
        data[index].comment = [];
      }
      data[index].comment.push(mainComments[comment]);
    }
  }

  return data;
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
    if (data[key] === undefined || data[key] === '') {
      data[key] = replaceData[key];
    }
  });

  await updateRepository.updatePost(data, threadId);

  return true;
}

// Get full thread (post + comments + subcommnets)
async function getThread(threadId) {
  let data = [];
  // console.log(data);

  const mainComments = await commentRepository.getAllCommentsByPostId(threadId);

  data.comments = [];

  for (let comment in mainComments) {
    if (mainComments[comment].threadComment === null) {
      data.push(mainComments[comment]);
    } else {
      const index = data.findIndex((i) => i);

      console.log(index);

      if (!data[index].comment) {
        data[index].comment = [];
      }
      data[index].comment.push(mainComments[comment]);
    }
  }

  return data;
}

// Delete thread
async function deleteThread(userId, threadId) {
  // SQL
  const pool = await database.getPool();

  // Validate
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

async function getPostsByUser(userName) {
  // SQL
  const pool = await database.getPool();

  const selectQuery =
    'SELECT t.threadId, u.userName, u.userId, u.userAvatar, p.postTitle, p.postContent, p.postType, t.threadDate, (SELECT SUM(v.voteType) FROM user_thread_vote v WHERE v.threadId = t.threadId)  AS Votes, (SELECT COUNT(c.commentId) FROM comment c WHERE c.threadPost = t.threadId) AS comments FROM thread t INNER JOIN post p  ON t.threadId = p.threadId INNER JOIN user u ON t.userId = u.userId WHERE u.userName = ? ORDER BY t.threadDate DESC';

  const [comments] = await pool.query(selectQuery, userName);

  return comments;
}

async function getHomePosts(user) {
  // SQL
  const pool = await database.getPool();

  const comQuery = 'SELECT comId FROM user_community_follow WHERE userId = ?';
  const [communities] = await pool.query(comQuery, user);

  if (!communities) {
    const error = new Error('No sigues a ninguna communidad aun');
    error.code = 409;
    throw error;
  }

  const postsQuery =
    'SELECT p.threadId, p.postTitle, p.postContent, p.postType, cm.comName, u.userName, u.userId, u.userAvatar, t.threadDate, (SELECT COUNT(c.threadPost) FROM comment c WHERE c.threadPost = p.threadId) as comments, (SELECT SUM(v.voteType) FROM user_thread_vote v WHERE v.threadId = p.threadId) AS votes, (SELECT voteType FROM user_thread_vote v2 WHERE v2.threadId = p.threadId AND v2.userId = f.userId) AS voted FROM post p INNER JOIN thread t ON p.threadId = t.threadId INNER JOIN user u ON t.userId = u.userId INNER JOIN community cm ON cm.comId = p.comId INNER JOIN user_community_follow f ON f.comId = cm.comId WHERE f.userId = ?';
  const [post] = await pool.query(postsQuery, user);

  return post;
}

async function getNewPosts() {
  // SQL
  const pool = await database.getPool();
  const selectQuery =
    'SELECT p.threadId, u.userName, u.userAvatar, u.userId, p.postTitle, p.postContent, p.postType, t.threadDate, (SELECT COUNT(c.threadPost) FROM comment c WHERE c.threadPost = p.threadId) as comments, cm.comName, cm.comId, up.updateDate, (SELECT SUM(v.voteType) FROM user_thread_vote v WHERE v.threadId = p.threadId) AS votes FROM post p INNER JOIN thread t  ON p.threadId = t.threadId INNER JOIN community cm ON p.comId = cm.comId INNER JOIN user u ON t.userId = u.userId LEFT OUTER JOIN thread_update up   ON p.threadId = up.threadId  LEFT OUTER JOIN user_thread_vote v ON p.threadId = v.threadId GROUP BY t.threadId ORDER BY t.threadDate DESC';
  const [post] = await pool.query(selectQuery);

  return post;
}

async function getPopularPosts() {
  // SQL
  const pool = await database.getPool();
  const selectQuery =
    'SELECT p.threadId, u.userName, u.userAvatar, u.userId, p.postTitle, p.postContent, p.postType, t.threadDate, (SELECT COUNT(c.threadPost) FROM comment c WHERE c.threadPost = p.threadId) as comments, cm.comName, cm.comId, up.updateDate, (SELECT SUM(v.voteType) FROM user_thread_vote v WHERE v.threadId = p.threadId) AS votes FROM post p INNER JOIN thread t  ON p.threadId = t.threadId INNER JOIN community cm ON p.comId = cm.comId INNER JOIN user u ON t.userId = u.userId LEFT OUTER JOIN thread_update up   ON p.threadId = up.threadId  LEFT OUTER JOIN user_thread_vote v ON p.threadId = v.threadId GROUP BY t.threadId ORDER BY votes DESC';
  const [post] = await pool.query(selectQuery);

  return post;
}

async function getInteractions(threadId) {
  // SQL
  const pool = await database.getPool();
  const selectQuery =
    'SELECT COUNT(c.threadId) AS comments,(SELECT SUM(v.voteType) FROM user_thread_vote v WHERE v.threadId = t.threadID) AS votes FROM thread t LEFT OUTER JOIN comment c  ON t.threadId = c.threadPost WHERE t.threadId = ? GROUP BY t.threadId';
  const [interactions] = await pool.query(selectQuery, threadId);

  return interactions;
}

module.exports = {
  createPost,
  getPostById,
  updatePost,
  getThread,
  getPostComments,
  deleteThread,
  getPostsByUser,
  getHomePosts,
  getNewPosts,
  getPopularPosts,
  getInteractions,
};
