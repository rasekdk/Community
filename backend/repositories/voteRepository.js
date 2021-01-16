const database = require('../infrastructure/database');

const getDate = require('./getDate');

async function addVote(userId, threadId, voteType) {
  // Required Data
  const time = getDate();

  // SQL
  const pool = await database.getPool();

  const selectQuery = 'SELECT * FROM user_thread_vote WHERE userId = ? AND threadId = ?';

  const [vote] = await pool.query(selectQuery, [userId, threadId]);

  // If vote exist update the vote tipe
  if (vote[0]) {
    const updateQuery = 'UPDATE user_thread_vote SET voteType = ? WHERE userId = ? AND threadId = ?';
    await pool.query(updateQuery, [voteType, userId, threadId]);
  }
  // If vote dont exist create de vote
  else if (!vote[0]) {
    const insertQuery = 'INSERT INTO user_thread_vote (userId, threadId, voteType, voteDate) VALUES (?,?,?,?)';
    await pool.query(insertQuery, [userId, threadId, voteType, time]);
  }

  const [newVote] = await pool.query(selectQuery, [userId, threadId]);

  return newVote[0];
}

module.exports = {
  addVote,
};
