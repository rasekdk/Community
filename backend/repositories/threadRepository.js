'use strict';

const database = require('../infrastructure/database');
const getDate = require('./getDate');

async function createThread(userId) {
  const time = getDate();

  const pool = await database.getPool();
  const threadQuery = 'INSERT INTO thread (threadDate, userId) VALUES (?, ?)';
  const [thread] = await pool.query(threadQuery, [time, userId]);

  return thread.insertId;
}

module.exports = createThread;
