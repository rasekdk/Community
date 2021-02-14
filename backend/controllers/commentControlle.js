'use strict';
// Require
const Joi = require('joi');
const { threadController } = require('./threadController');

// Imports
const { postRepository, commentRepository, userRepository } = require('../repositories');

// Comment
// Create comment
async function createComment(req, res) {
  try {
    // Body
    const { commentContent } = req.body;

    // Params
    const threadId = req.params.threadId;
    const tokenUserId = req.auth.id;

    // Validate
    const bodySchema = Joi.string().min(1).required();
    await bodySchema.validateAsync(commentContent);

    const requiredIdSchema = Joi.number().positive().required();
    await requiredIdSchema.validateAsync(threadId);

    // check user
    const checkUser = await userRepository.getUserById(tokenUserId);

    if (!checkUser) {
      const error = new Error('El usuario que estás usando no existe');
      error.code = 409;
      throw error;
    }

    // Check post
    const checkPost = await postRepository.getPostById(threadId);

    if (!checkPost) {
      const error = new Error('No se puede crear un comentario de un post que no existe');
      error.code = 409;
      throw error;
    }

    // New comment
    await commentRepository.createComment(tokenUserId, threadId, commentContent);

    const post = await postRepository.getPostById(threadId);

    const comments = await postRepository.getPostComments(threadId);

    res.send({ post: post, comments: comments });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}
// Creates a subcomment
async function createSubComment(req, res) {
  try {
    // Body
    const { commentContent } = req.body;

    // Params
    const threadId = req.params.threadId;
    const commentId = req.params.commentId;
    const tokenUserId = req.auth.id;

    // Validate
    const bodySchema = Joi.string().min(1).required();
    await bodySchema.validateAsync(commentContent);

    const requiredIdSchema = Joi.number().positive().required();
    await requiredIdSchema.validateAsync(threadId, commentId);

    // check user
    const checkUser = await userRepository.getUserById(tokenUserId);

    if (!checkUser) {
      const error = new Error('El usuario que estás usando no existe');
      error.code = 409;
      throw error;
    }

    // Check post
    const checkPost = await postRepository.getPostById(threadId);

    if (!checkPost) {
      const error = new Error('No se puede crear un comentario de un post que no existe');
      error.code = 409;
      throw error;
    }

    // New comment
    await commentRepository.createSubComment(tokenUserId, threadId, commentId, commentContent);

    // Show all the thread
    const post = await postRepository.getPostById(threadId);

    const comments = await postRepository.getPostComments(threadId);

    res.send({ post: post, comments: comments });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Get comment
async function getComment(req, res) {
  try {
    // Params
    const threadId = req.params.threadId;

    // Validate
    const threadIdSchema = Joi.number().positive().required();
    await threadIdSchema.validateAsync(threadId);

    // SQL query
    const [comment] = await commentRepository.getCommentById(threadId);

    if (!comment) {
      const error = new Error('La url a la que quieres acceder no se encuentra');
      error.code = 404;

      throw error;
    }

    // Response
    res.send(comment);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function getCommentsByUser(req, res) {
  try {
    // Params
    const userName = req.params.name;

    // Validate
    const userNameSchema = Joi.string().required();
    await userNameSchema.validateAsync(userName);

    // SQL query
    const comment = await commentRepository.getCommentsByUser(userName);

    if (!comment) {
      const error = new Error('La url a la que quieres acceder no se encuentra');
      error.code = 404;

      throw error;
    }

    // Response
    res.send(comment);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Update comment
async function updateComment(req, res) {
  try {
    // Body
    const { commentContent } = req.body;

    // Params
    const threadId = req.params.threadId;
    const tokenUserId = req.auth.id;

    // Validate
    const bodySchema = Joi.string().min(1).required();
    await bodySchema.validateAsync(commentContent);

    const requiredIdSchema = Joi.number().positive().required();
    await requiredIdSchema.validateAsync(threadId);

    // check user
    const checkUser = await userRepository.getUserById(tokenUserId);

    if (!checkUser) {
      const error = new Error('El usuario que estás usando no existe');
      error.code = 409;
      throw error;
    }

    // Check post
    const checkPost = await postRepository.getPostById(threadId);

    if (!checkPost) {
      const error = new Error('No se puede editar un comentario de un post que no existe');
      error.code = 409;
      throw error;
    }

    // SQL query
    await commentRepository.updateComment(tokenUserId, threadId, commentContent);

    // SQL response data
    const [comment] = await commentRepository.getCommentById(threadId);

    // Response
    res.send(comment);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = {
  createComment,
  createSubComment,
  getComment,
  getCommentsByUser,
  updateComment,
};
