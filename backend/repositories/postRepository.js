'use strcit';

const database = require('../infrastructure/database');

const getDate = require('./getDate');
const createThread = require('./threadRepository');

async function createPost(userId, postData) {
  // get required data
  const threadId = await createThread(userId);

  // DB scripts
  const pool = await database.getPool();
  const postQuery =
    'INSERT INTO post (threadId, comId, postTitle, postContent, postType) VALUES (?,?,?,?,?)';
  const [post] = await pool.query(postQuery, [
    threadId,
    postData.comId,
    postData.postTitle,
    postData.postContent,
    postData.postType,
  ]);

  return post.insertId;
}

async function getPostById(postId) {
  const pool = await database.getPool();
  const selectQuery = 'SELECT * FROM post p WHERE p.postId = ?';
  return await pool.query(selectQuery, postId);
}

module.exports = {
  createPost,
  getPostById,
};
