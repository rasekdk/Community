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
  topicController,
  commentController,
  postController,
} = require('./controllers');

const { validateAuth, validateAdmin } = require('./middlewares/validateAuth');

// .env
const { SERVER_PORT } = process.env;

// Express
const app = express();
app.use(bodyParser.json());

// Rutes

// SignIn/SignUp
app.post('/register', usersController.register);
app.post('/login', usersController.login);

// Posts
app.post('/post', validateAuth, postController.createPost);
app.get('/post/:threadId', postController.getPost);
app.put('/post/:threadId', validateAuth, postController.updatePost);

// Community
app.post('/c', validateAuth, communityController.createCommunity);
app.get('/c', communityController.getCommunities);
app.get('/c/:id', communityController.getCommunities);
app.delete('/c/:id', validateAuth, communityController.deleteCommunity);
app.post('/follow/c/:id', validateAuth, communityController.followCommunity);

// Comments
app.post('/comment/:threadId', validateAuth, commentController.createComment);
app.post('/comment/:threadId/:commentId', validateAuth, commentController.createSubComment);
app.get('/comment/:threadId', commentController.getComment);
app.put('/comment/:threadId', validateAuth, commentController.updateComment);

// Thread
app.delete('/:threadId', validateAuth, threadController.deleteThread);
app.get('/:threadId', threadController.getThread);

// Vote thread
app.post('/vote/:threadId', validateAuth, threadController.addVote);

// Topics
app.post('/t', validateAdmin, topicController.createTopic);
app.get('/t', topicController.getTopics);
app.post('/follow/t/:id', validateAuth, topicController.followTopic);
app.delete('/t/:id', validateAdmin, topicController.deleteTopic);

// Users
app.get('/u/:name', usersController.getUser);

// Listener
app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));
