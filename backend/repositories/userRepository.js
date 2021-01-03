'use strict';

const database = require('../infrastructure/database');

async function getUserByEmail(email) {
  const pool = await database.getPool();
  const query = 'SELECT * FROM user WHERE userEmail = ?';
  const [users] = await pool.query(query, email);

  return users[0];
}

async function createUser(nombre, email, password, role) {
  const pool = await database.getPool();
  const insertQuery =
    'INSERT INTO user (userName, userEmail, userPassword, userRole) VALUES (?, ?, ?, ?)';
  const [created] = await pool.query(insertQuery, [
    nombre,
    email,
    password,
    role,
  ]);

  return created.insertId;
}

async function userExist(userId) {
  const pool = await database.getPool();
  const selectQuery = 'SELECT * FROM user WHERE userId=?';
  const [user] = await pool.query(selectQuery, userId);

  return user[0];
}

module.exports = {
  getUserByEmail,
  createUser,
  userExist,
};
