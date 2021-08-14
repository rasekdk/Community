'use strict';

const mysql = require('mysql2/promise');

let pool;

async function getPool() {
  if (!pool) {
    pool = await mysql.createPool({
      host: "eu-cdbr-west-01.cleardb.com",
      database: "heroku_5ffdfa1388c578a",
      user: "b2ebce61f4a1a3",
      password: "06f0e23f",
    });
  }

  return pool;
}

module.exports = { getPool };