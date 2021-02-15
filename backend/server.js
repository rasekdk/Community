'use strict';

// Requires
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Imports
const {
  userController,
  threadController,
  communityController,
  topicController,
  commentController,
  postController,
} = require('./controllers');

const { validateAuth, validateAdmin, checkIfNeedValidation } = require('./middlewares/validateAuth');

// .env
const { SERVER_PORT } = process.env;

// Express
const app = express();
app.use(bodyParser.json());

// CORS
app.use(cors());

// static files
const staticPath = './public';
app.use(express.static(staticPath));

// Routes

app.get('/new', postController.getNewPosts);
app.get('/popular', postController.getPopularPosts);

// SignIn/SignUp
app.post('/register', userController.register);
app.post('/login', userController.login);

// Posts
app.post('/p', validateAuth, postController.createPost);
app.get('/p/:threadId', postController.getPost);
app.get('/p/u/:name', postController.getPostByUser);
app.put('/p/:threadId', validateAuth, postController.updatePost);
app.get('/c/p/:threadId', postController.getComments);

// Community
app.post('/c', validateAuth, communityController.createCommunity);
app.get('/c/f', validateAuth, communityController.getFollowedCommunities);
app.get('/c/:id', communityController.getcommunityById);
app.get('/c', communityController.getCommunities);
app.delete('/c/:id', validateAuth, communityController.deleteCommunity);
app.post('/c/follow/:id', validateAuth, communityController.followCommunity);

// Comments
app.post('/comment/:threadId/:commentId', validateAuth, commentController.createSubComment);
app.post('/comment/:threadId', validateAuth, commentController.createComment);
app.get('/comment/:threadId', commentController.getComment);
app.get('/c/u/:name', commentController.getCommentsByUser);
app.put('/c/:threadId', validateAuth, commentController.updateComment);

// Topics
app.post('/t', validateAdmin, topicController.createTopic);
app.get('/t', topicController.getTopics);
app.get('/t/img', topicController.getTopicImages);
app.get('/t/:id', topicController.getTopicById);
app.post('/t/follow/:id', validateAuth, topicController.followTopic);
app.delete('/t/:id', validateAdmin, topicController.deleteTopic);

// Thread
app.delete('/:threadId', validateAuth, threadController.deleteThread);
app.get('/:threadId', threadController.getThread);

// Vote thread
app.post('/vote/:threadId', validateAuth, threadController.addVote);
app.delete('/vote/:threadId', validateAuth, threadController.unVote);

// Users
app.get('/u/:name', userController.getUser);
app.put('/u/:name', validateAuth, userController.updateUser);

app.get('/', postController.getHomePosts);

// Listener
app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));
