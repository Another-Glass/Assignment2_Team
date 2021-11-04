const { resFormatter, logger } = require('../utils');
const { statusCode, responseMessage } = require('../globals');

const commentService = require('../services/commentService');
const postService = require('../services/postService');

//댓글조회
exports.getCommentList = async (req, res) => {
  try {
    const { postId } = req.params;
    const { offset, limit } = req.query;

    //입력값 확인
    if (postId === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(resFormatter.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //게시글 유무
    let post = await postService.readPost(postId);
    if (post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(resFormatter.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    //쿼리실행
    let comments = await commentService.readCommentsInPost(postId, Number(offset), Number(limit));

    return res.status(statusCode.OK)
      .send(resFormatter.success(statusCode.OK, responseMessage.READ_COMMENTLIST_SUCESS, comments));
  } catch (err) {
    next(err);
  }
}

//대댓글 조회
exports.getCommentInComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { offset, limit } = req.query;

    //댓글 유무
    let comment = await commentService.readComment(commentId);
    if (comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(resFormatter.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }

    //쿼리실행
    let comments = await commentService.readCommentsInComment(commentId, Number(offset), Number(limit));

    return res.status(statusCode.OK)
      .send(resFormatter.success(statusCode.OK, responseMessage.READ_COMMENTLIST_SUCESS, comments));
  } catch (err) {
    next(err);
  }
}

//댓글 생성
exports.postComment = async (req, res) => {
  try {
    const id = req.decoded;
    const postId = req.params.postId;
    const content = req.body.content;

    //입력값 확인
    if (content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(resFormatter.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //게시글 유무
    let post = await postService.readPost(postId);
    if (post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(resFormatter.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    //쿼리실행
    let comment = await commentService.creatCommentInPost(postId, id, content);

    return res.status(statusCode.CREATED)
      .send(resFormatter.success(statusCode.CREATED, responseMessage.CREATE_COMMENT_SUCCESS, { id: comment._id }));
  } catch (err) {
    next(err);
  }
}

//대댓글 생성
exports.postCommentInComment = async (req, res) => {
  try {
    const id = req.decoded;
    const { commentId, postId } = req.params;
    const content = req.body.content;

    //입력값 확인
    if (content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(resFormatter.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //댓글 유무
    let comment = await commentService.readComment(commentId);
    if (comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(resFormatter.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }

    //쿼리실행
    let resultComment = await commentService.creatCommentInComment(postId, commentId, id, content);

    return res.status(statusCode.CREATED)
      .send(resFormatter.success(statusCode.CREATED, responseMessage.CREATE_COMMENT_SUCCESS, { id: resultComment._id }));
  } catch (err) {
    next(err);
  }
}

//대댓글or댓글 변경
exports.putComment = async (req, res) => {
  try {
    const id = req.decoded;
    const commentId = req.params.commentId;
    const content = req.body.content;

    //입력값 확인
    if (content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(resFormatter.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //댓글 유무
    let comment = await commentService.readComment(commentId);
    if (comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(resFormatter.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }

    // 작성자 불일치
    if (comment.userId.toString() !== id) {
      return res.status(statusCode.UNAUTHORIZED)
        .send(resFormatter.fail(statusCode.UNAUTHORIZED, responseMessage.PERMISSION_ERROR));
    }

    //쿼리실행
    await commentService.updateComment(commentId, id, content);

    return res.status(statusCode.OK)
      .send(resFormatter.success(statusCode.OK, responseMessage.UPDATE_COMMENT_SUCCESS));
  } catch (err) {
    next(err);
  }
}

//대댓글or댓글 삭제
exports.deleteComment = async (req, res) => {
  try {
    const id = req.decoded;
    const commentId = req.params.commentId;
    const content = req.body.content;

    let comment = await commentService.readComment(commentId);

    //댓글 유무
    if (comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(resFormatter.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }

    // 작성자 불일치
    if (comment.userId.toString() !== id) {
      return res.status(statusCode.UNAUTHORIZED)
        .send(resFormatter.fail(statusCode.UNAUTHORIZED, responseMessage.PERMISSION_ERROR));
    }

    //쿼리실행
    await commentService.removeComment(commentId, id, content);

    return res.status(statusCode.OK)
      .send(resFormatter.success(statusCode.OK, responseMessage.DELETE_COMMENT_SUCCESS));
  } catch (err) {
    next(err);
  }
}
