'use strict';
// Require
const Joi = require('joi');

// Imports
const { postRepository, commentRepository, voteRepository, userRepository } = require('../repositories');
const { getPostById } = require('../repositories/postRepository');

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

// Update thread
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

    // Show all the thread
    const [thread] = await postRepository.getThread(threadId);

    res.send(thread);
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
    const newComment = await commentRepository.createSubComment(tokenUserId, threadId, commentId, commentContent);

    // Show all the thread
    const [thread] = await postRepository.getThread(threadId);

    res.send(thread);
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

// Thread (for both post and comments, insert threadId for actions)
// get Thread
async function getThread(req, res) {
  try {
    const threadId = req.params.threadId;
    const thread = await postRepository.getThread(threadId);

    res.send(thread);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Delete thread
async function deleteThread(req, res) {
  try {
    // Params
    const userId = req.auth.id;
    const threadId = req.params.threadId;

    // Validate
    const threadIdSchema = Joi.number().positive().required();
    await threadIdSchema.validateAsync(threadId);

    // SQL query
    await postRepository.deleteThread(userId, threadId);

    // Response
    res.send(`El hilo ${threadId} ha sido eliminado`);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

// Create Vote
async function addVote(req, res) {
  try {
    // Params
    const threadId = req.params.threadId;
    const vote = req.query.vote;
    const tokenUserId = req.auth.id;

    // Validate
    const schemaId = Joi.number().required();
    const schemaVote = Joi.string().min(1).max(1).required();

    await schemaId.validateAsync(threadId, tokenUserId);
    await schemaVote.validateAsync(vote);

    // Type of vote
    let voteType;

    if (vote === 'p') {
      voteType = 1;
    } else if (vote === 'n') {
      voteType = -1;
    }

    const createVote = await voteRepository.addVote(tokenUserId, threadId, voteType);

    res.send(createVote);
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
  createComment,
  createSubComment,
  getComment,
  updateComment,
  getThread,
  deleteThread,
  addVote,
};
