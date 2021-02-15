'use strict';
// Require
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Imports
const { postRepository, commentRepository } = require('../repositories');
// const { getPostById } = require('../repositories/postRepository');

// Post
// Create post
async function createPost(req, res) {
  try {
    // Body
    const { postTitle, postContent, postType, comId } = req.body;
    const postData = { postTitle, postContent, postType, comId };

    // Params
    const tokenUserId = req.auth.id;

    // Validate
    const postSchema = Joi.object({
      postTitle: Joi.string().min(4).max(50).required(),
      postContent: Joi.string().min(4).max(255).required(),
      postType: Joi.string().required(),
      comId: Joi.number().required(),
    });
    await postSchema.validateAsync({ postTitle, postContent, postType, comId });

    // SQL query
    const createdPost = await postRepository.createPost(tokenUserId, postData);

    // SQL response data
    const post = await postRepository.getPostById(createdPost);

    // Response
    res.send(post);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Get post by id
async function getPost(req, res) {
  try {
    // Params
    const threadId = req.params.threadId;

    // Validate
    const threadIdSchema = Joi.number().positive().required();
    await threadIdSchema.validateAsync(threadId);

    // SQL query
    const [post] = await postRepository.getPostById(threadId);

    if (!post) {
      const error = new Error('La url a la que quieres acceder no se encuentra');
      error.status = 404;

      throw error;
    }

    // Response
    res.send(post);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message, status: err.status });
  }
}

async function getPostByUser(req, res) {
  try {
    // Params
    const userId = req.params.name;

    // Validate
    const userIdSchema = Joi.string().required();
    await userIdSchema.validateAsync(userId);

    // SQL query
    const post = await postRepository.getPostsByUser(userId);

    if (!post) {
      const error = new Error('La url a la que quieres acceder no se encuentra');
      error.status = 404;

      throw error;
    }

    // Response
    res.send(post);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message, status: err.status });
  }
}

async function getComments(req, res) {
  try {
    // Params
    const threadId = req.params.threadId;

    // Validate
    const threadIdSchema = Joi.number().positive().required();
    await threadIdSchema.validateAsync(threadId);

    // SQL query
    const comments = await postRepository.getPostComments(threadId);

    if (!comments) {
      const error = new Error('La url a la que quieres acceder no se encuentra');
      error.status = 404;

      throw error;
    }

    // Response
    res.send(comments);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message, status: err.status });
  }
}

// Update post
async function updatePost(req, res) {
  try {
    // Body
    const { comId, postTitle, postContent, postType } = req.body;
    const updateData = { comId, postTitle, postContent, postType };

    // Params
    const tokenUserId = req.auth.id;
    const threadId = req.params.threadId;

    // Validate
    const postSchema = Joi.object({
      postTitle: Joi.alternatives().try(Joi.string().min(4).max(50), Joi.any().allow('')),
      postContent: Joi.alternatives().try(Joi.string().max(250), Joi.any().allow('')),
      postType: Joi.alternatives().try(Joi.string(), Joi.any().allow('')),
      comId: Joi.alternatives().try(Joi.number(), Joi.any().allow('')),
    });
    await postSchema.validateAsync({ postTitle, postContent, postType, comId });

    const postIdSchema = Joi.number().positive().required();
    await postIdSchema.validateAsync(threadId, tokenUserId);

    // SQL query
    await postRepository.updatePost(tokenUserId, threadId, updateData);

    // SQL response data
    const [post] = await postRepository.getPostById(threadId);

    // Response
    res.send(post);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Home
async function getHomePosts(req, res) {
  try {
    const token = req.headers.auth;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { id } = decodedToken;

    const post = await postRepository.getHomePosts(id);

    res.send(post);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function getNewPosts(req, res) {
  try {
    const post = await postRepository.getNewPosts();
    res.send(post);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function getPopularPosts(req, res) {
  try {
    const post = await postRepository.getPopularPosts();
    res.send(post);
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
  createPost,
  getPost,
  getPostByUser,
  getComments,
  updatePost,
  getHomePosts,
  getHomePosts,
  getNewPosts,
  getPopularPosts,
};
