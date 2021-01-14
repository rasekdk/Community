'use strict';

const database = require('../infrastructure/database');
const getDate = require('./getDate');

// Create thread
async function createThread(userId) {
  // Get Date
  const time = getDate();

  // SQL
  const pool = await database.getPool();
  const threadQuery = 'INSERT INTO thread (threadDate, userId) VALUES (?, ?)';
  const [thread] = await pool.query(threadQuery, [time, userId]);

  // Response
  return thread.insertId;
}

// Get a single thread (the post or the comment alone)
async function singleThread(threadId) {
  // SQL
  const pool = await database.getPool();
  const threadQuery = 'SELECT * FROM thread WHERE threadId = ?';
  const [thread] = await pool.query(threadQuery, threadId);

  // Response
  return thread[0];
}

module.exports = { createThread, singleThread };
