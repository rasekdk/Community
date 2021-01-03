'use strict';

// Requires
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Imports
const {
  usersController,
  threadController,
  communityController,
} = require('./controllers');
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

// Register
app.post('/register', usersController.register);

// Login
app.post('/login', usersController.login);

// Posts
// Create post
app.post('/post/new', validateAuth, threadController.createPost);

// See post
// see post without comments
app.get('/post/:postId', threadController.getPost);

// Comments
// New comment
app.post(
  '/post/:postId/addComment',
  validateAuth,
  threadController.createComment
);

// Communities
// List of communities
app.get('/communities', communityController.getAllCommunities);

// Create a community
app.post('/addCommunity', validateAuth, communityController.createCommunity);

// List of followed communities
app.get(
  '/communities/followed',
  validateAuth,
  communityController.getFollowedCommunities
);

// List of created communities
app.get(
  '/communities/created',
  validateAuth,
  communityController.getCreatedCommunities
);

// Show community info
// app.get('/community/:comName', communityController.getCommunityByName);

// Votes
// Create Vote
app.post('/:threadId', validateAuth, threadController.addVote);

app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));
