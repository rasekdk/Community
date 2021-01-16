'use strict';

// Requires
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Imports
const { usersController, threadController, communityController, topicController } = require('./controllers');

const { validateAuth, validateAdmin } = require('./middlewares/validateAuth');

// .env
const { SERVER_PORT } = process.env;

// Express
const app = express();
app.use(bodyParser.json());

// Rutes

// Register - CHECK
app.post('/register', usersController.register);

// Login - CHECK
app.post('/login', usersController.login);

// Posts
// Create post - need Auth - CHECK
app.post('/post', validateAuth, threadController.createPost);

// Get post by Id - CHECK
app.get('/post/:threadId', threadController.getPost);

// Update post by Id - CHECK
app.put('/post/:threadId', validateAuth, threadController.updatePost);

// Community
// Create community - need Auth - CHECK
app.post('/c', validateAuth, communityController.createCommunity);

// Get all communities
app.get('/c', communityController.getCommunities);

// Get community by id or name
app.get('/c/:id', communityController.getCommunities);

// Delete community
app.delete('/c/:id', validateAuth, communityController.deleteCommunity);

// Follow community
app.post('/follow/c/:id', validateAuth, communityController.followCommunity);

// Comments
// Create comment - need Auth - CHECK
app.post('/comment/:threadId', validateAuth, threadController.createComment);

// Create subcomment - need Auth  - CHECK (esta es la maxima profundidad que se puede hacer)
app.post('/comment/:threadId/:commentId', validateAuth, threadController.createSubComment);

// Get comment by Id - CHECK
app.get('/comment/:threadId', threadController.getComment);

// Update Comment - CHECK (solo se puede modificar el contenido, si no cambia el comentario da fallo)
app.put('/comment/:threadId', validateAuth, threadController.updateComment);

// Delete thread - need Auth - need Be creatorm - CHECK (se borra el contenido y todos sus hijos)
app.delete('/:threadId', validateAuth, threadController.deleteThread);

// Get Thread - CHECK (muestra todo el hilo, post, comentario y subcomentario)
app.get('/:threadId', threadController.getThread);

// Vote thread
app.post('/vote/:threadId', validateAuth, threadController.addVote);

// Topics
// Create topic
app.post('/t', validateAdmin, topicController.createTopic);

// Get topics
app.get('/t', topicController.getTopics);

// Follow Topic
app.post('/follow/t/:id', validateAuth, topicController.followTopic);

// Delete topic
app.delete('/t/:id', validateAdmin, topicController.deleteTopic);

// Users
// Get user
app.get('/u/:name', usersController.getUser);

// Listener
app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));
