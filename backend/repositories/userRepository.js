'use strict';

const database = require('../infrastructure/database');

// User
// Create new user - CHECK
async function createUser(nombre, email, password, role) {
  // SQL - Add a new user
  const pool = await database.getPool();
  const insertQuery = 'INSERT INTO user (userName, userEmail, userPassword, userRole) VALUES (?, ?, ?, ?)';
  const [created] = await pool.query(insertQuery, [nombre, email, password, role]);

  // Response
  return created.insertId;
}

// Get user by email - CHECK
async function getUserByEmail(email) {
  // SQL
  const pool = await database.getPool();
  const query = 'SELECT * FROM user WHERE userEmail = ?';
  const [users] = await pool.query(query, email);

  return users[0];
}

// Get user by name - CHECK
async function getUserByName(name) {
  // SQL
  const pool = await database.getPool();
  const query = 'SELECT * FROM user WHERE userName = ?';
  const [users] = await pool.query(query, name);

  // Response
  return users[0];
}

// Get user by Id - CHECK
async function getUserById(userId) {
  // SQL
  const pool = await database.getPool();
  const query = 'SELECT * FROM user WHERE userId = ?';
  const [user] = await pool.query(query, userId);

  // Response
  return user[0];
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserByName,
  getUserById,
};
