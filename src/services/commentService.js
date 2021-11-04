const models = require('../models');
const ObjectId = require('mongodb').ObjectId;

exports.readCommentsInPost = async (postId, offset, limit) => {
  try {
    const comments = await models.comment.find({
      postId: postId
    })
      .sort({ 'createdAt': -1 })
      .limit(limit)
      .skip(offset)

    return comments;
  } catch (err) {
    throw err;
  }
}

exports.readCommentsInComment = async (commentId, offset, limit) => {
  try {
    const comments = await models.comment.find({
      parentCommentId: commentId
    })
      .sort({ 'createdAt': -1 })
      .limit(limit)
      .skip(offset)

    return comments;
  } catch (err) {
    throw err;
  }
}

exports.readComment = async (commentId) => {
  try {
    const comment = await models.comment.findById(commentId).lean()

    return comment;
  } catch (err) {
    throw err;
  }
}

exports.creatCommentInPost = async (postId, userId, content) => {
  try {
    const comment = await models.comment.create({
      postId: postId,
      userId: userId,
      content: content,
    });

    return comment;
  } catch (err) {
    throw err;
  }
}

exports.creatCommentInComment = async (postId, commentId, userId, content) => {
  try {
    const comment = await models.comment.create({
      postId: postId,
      parentCommentId: ObjectId(commentId),
      userId: userId,
      content: content,
    });

    return comment;
  } catch (err) {
    throw err;
  }
}

exports.updateComment = async (commentId, userId, content) => {
  try {
    const comments = await models.comment.findByIdAndUpdate(commentId, { content: content }).lean();

    return comments;
  } catch (err) {
    throw err;
  }
}

exports.removeComment = async (commentId) => {
  try {
    const comments = await models.comment.findByIdAndDelete(commentId).lean();

    return comments;
  } catch (err) {
    throw err;
  }
}

