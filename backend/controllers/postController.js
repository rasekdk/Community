'use strict';
// Require
const Joi = require('joi');

// Imports
const { postRepository } = require('../repositories');
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
    const [post] = await postRepository.getPostById(createdPost);

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
      error.code = 404;

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
    res.send({ error: err.message });
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
      postTitle: Joi.string().min(4).max(50),
      postContent: Joi.string().min(4).max(255),
      postType: Joi.string(),
      comId: Joi.number(),
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

module.exports = {
  createPost,
  getPost,
  updatePost,
  getHomePosts,
};
