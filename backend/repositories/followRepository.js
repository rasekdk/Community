'use strict';

const database = require('../infrastructure/database');

async function registerTopics(topics, userId) {
  const pool = await database.getPool();
  for (let topic of Object.values(topics)) {
    if (topic === undefined) {
      break;
    }
    const insertQuery =
      'INSERT INTO user_topic_follow (topicId, userId) VALUES (?,?)';
    await pool.query(insertQuery, [topic, userId]);
  }
  const selectQuery =
    'SELECT topicName FROM user_topic_follow f INNER JOIN  topic t ON t.topicId = f.topicId WHERE userId = ?';
  const [topicsArray] = await pool.query(selectQuery, userId);

  const myTopics = [].concat.apply(
    [],
    topicsArray.map((x) => Object.values(x))
  );

  return myTopics;
}

async function registerCommunities(communities, userId) {
  const pool = await database.getPool();
  for (let community of Object.values(communities)) {
    if (community === undefined) {
      break;
    }

    const insertQuery =
      'INSERT INTO user_community_follow (comId, userId) VALUES (?,?)';
    await pool.query(insertQuery, [community, userId]);
  }
  const selectQuery =
    'SELECT comName FROM user_community_follow f INNER JOIN  community c ON c.comId = f.comId WHERE userId = ?';
  const [communitiesArray] = await pool.query(selectQuery, userId);

  const myCommunities = [].concat.apply(
    [],
    communitiesArray.map((x) => Object.values(x))
  );

  return myCommunities;
}

module.exports = { registerTopics, registerCommunities };
