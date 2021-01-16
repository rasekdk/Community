'use strict';

// Requires
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Imports
const { usersController, threadController, communityController } = require('./controllers');
const validateAuth = require('./middlewares/validateAuth');

const { SERVER_PORT } = process.env;

const app = express();

app.use(bodyParser.json());

// Rutes

// Home

app.get('/', (req, res) => {
  // If logged redirect to /home

  if (validateAuth) {
    postController.loggedHome;
  }

  // If not logged show related posts
  else {
    postController.noLoggedHome;
  }
});

// Communities
// List of communities
app.get('/communities', communityController.getAllCommunities);

// List of followed communities
app.get('/communities/followed', validateAuth, communityController.getFollowedCommunities);

// List of created communities
app.get('/communities/created', validateAuth, communityController.getCreatedCommunities);

// Create a community
app.post('/communities/add', validateAuth, communityController.createCommunity);

// Show community info
app.get('/communities/:comParam', communityController.getCommunity);

// Votes
// Create Vote
app.post('/vote/:threadId', validateAuth, threadController.addVote);

app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));
