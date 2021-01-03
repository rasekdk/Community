'use strict';

const Joi = require('joi');

const {
  postRepository,
  commentRepository,
  voteRepository,
} = require('../repositories');

// Post
// Create post
async function createPost(req, res) {
  try {
    // get body data
    const { postTitle, postContent, postType, comId } = req.body;

    // Validate body
    const postSchema = Joi.object({
      postTitle: Joi.string().min(4).max(50),
      postContent: Joi.string().min(4).max(255),
      postType: Joi.string(),
      comId: Joi.number(),
    });
    await postSchema.validateAsync({ postTitle, postContent, postType, comId });

    // get all data
    const postData = { postTitle, postContent, postType, comId };

    // Get userId from login token
    const tokenUserId = req.auth.id;
    // create post
    const createdPost = await postRepository.createPost(tokenUserId, postData);

    // get post data for show
    const [post] = await postRepository.getPostById(createdPost);

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
    const postId = req.params.postId;
    const postIdSchema = Joi.number().positive().required();
    await postIdSchema.validateAsync(postId);

    const [post] = await postRepository.getPostById(postId);

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

// Get all post of a Community

// Comment
// Create Comment
async function createComment(req, res) {
  try {
    const { commentContent } = req.body;

    const postId = req.params.postId;
    const commentId = req.query.commentId;
    const postIdSchema = Joi.number().positive().required();
    const commentIdSchema = Joi.number().positive();
    await postIdSchema.validateAsync(postId);
    await commentIdSchema.validateAsync(commentId);

    const tokenUserId = req.auth.id;

    const commentSchema = Joi.object({
      commentContent: Joi.string().min(4).max(255).required(),
    });

    await commentSchema.validateAsync({ commentContent });

    // create coment
    const createComment = await commentRepository.createComment(
      tokenUserId,
      postId,
      commentContent,
      commentId
    );

    // get post and comments of the post
    const [comment] = await commentRepository.getCommentById(createComment);

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

// Votes
// Create vote
async function addVote(req, res) {
  try {
    const threadId = req.params.threadId;
    const vote = req.query.vote;
    const tokenUserId = req.auth.id;

    const schemaId = Joi.number().required();
    const schemaVote = Joi.string().min(1).max(1).required();

    await schemaId.validateAsync(threadId, tokenUserId);
    await schemaVote.validateAsync(vote);

    let voteType;

    if (vote === 'p') {
      voteType = 1;
    } else if (vote === 'n') {
      voteType = -1;
    }

    const createVote = await voteRepository.addVote(
      tokenUserId,
      threadId,
      voteType
    );

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
  createComment,
  getPost,
  addVote,
};
