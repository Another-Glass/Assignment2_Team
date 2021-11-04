const models = require('../models');

exports.createPost = async (title, content, categoryIdx, userId) => {
  try {
    const post = await models.post.create({
      title,
      content,
      userId,
      categoryIdx,
      viewCount: 0
    });
    return post;
  } catch (err) {
    throw err;
  }
}

exports.readPost = async (postId) => {
  try {
    const post = await models.post.findById({
      _id: postId
    });
    return post;
  } catch (err) {
    throw err;
  }
}

exports.updatePost = async (title, content, categoryIdx, postId) => {
  try {
    const post = await models.post.findOneAndUpdate(
      {
        _id: postId
      },
      {
        title,
        content,
        categoryIdx
      }
    );
    return post;
  } catch (err) {
    throw err;
  }
}

exports.destroyPost = async (postId) => {
  try {
    const post = await models.post.findByIdAndDelete(postId);
    return post;
  } catch (err) {
    throw err;
  }
}

exports.readPostList = async (offset, limit) => {
  try {
    const postList = await models.post.find()
      .sort({ 'createdAt': -1 })
      .limit(limit)
      .skip(offset)
    return postList;
  } catch (err) {
    throw err;
  }
}


exports.increaseViewCount = async (postId, viewCount) => {
  try {
    const post = await models.post.findOneAndUpdate(
      {
        _id: postId
      },
      {
        viewCount
      }
    );
    return post;
  } catch (err) {
    throw err;
  }
}


exports.searchPost = async (categoryId, offset, limit, title, content) => {
  try {
    const query = [];

    if (title === undefined && content === undefined) return null;

    if (title) query.push({ title: { $regex: title } });
    if (content) query.push({ content: { $regex: content } });

    const results = await models.post.find({
      $and: [{ $or: query }, { "categoryIdx": categoryId }]
    })
      .sort({ 'createdAt': -1 })
      .limit(Number(limit))
      .skip(Number(offset))
    return results;
  } catch (err) {
    throw err;
  }
}