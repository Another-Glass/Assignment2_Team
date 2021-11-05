const { resFormatter, logger } = require('../utils');
const { statusCode, responseMessage } = require('../globals');

const postService = require('../services/postService.js');

const { ValidationError, NotMatchedPostError, UnAuthorizedError } = require('../utils/errors/postError');


//게시글 생성
exports.postPost = async (req, res, next) => {
  try {
    const id = req.decoded;
    const { title, content, categoryIdx } = req.body;

    //입력값 확인
    if (title === undefined || content === undefined || categoryIdx === undefined) throw new ValidationError()

    //쿼리실행
    let post = await postService.createPost(title, content, categoryIdx, id);

    return res.status(statusCode.CREATED)
      .send(resFormatter.success(responseMessage.CREATE_POST_SUCCESS, { id: post._id }));
  } catch (err) {
    next(err);
  }
}

//게시글 조회
exports.getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    //입력값 확인
    if (postId === undefined) throw new ValidationError();

    //쿼리 실행
    const post = await postService.readPost(postId);

    //게시글 유무 확인
    if (post === null) throw new NotMatchedPostError();

    //조회수 변경
    if (!req.cookies[`postId${postId}`]) {
      post.viewCount++;
      postService.increaseViewCount(postId, post.viewCount);
    }

    //조회수 체크를 위한 쿠키
    return res.cookie(`postId${postId}`, postId, { maxAge: 1000 * 60 * 5 })
      .status(statusCode.OK)
      .send(resFormatter.success(responseMessage.READ_POST_SUCCESS, post));
  } catch (err) {
    next(err);
  }
}

//게시글 수정
exports.putPost = async (req, res, next) => {
  try {
    const id = req.decoded;
    const { postId } = req.params;
    const { title, content, categoryIdx } = req.body;

    //입력값 확인
    if (postId === undefined || title === undefined || content === undefined || categoryIdx == undefined) {
      throw new ValidationError();
    }

    //사전 쿼리
    const post = await postService.readPost(postId);

    //게시글 유무 확인
    if (post === null) throw new NotMatchedPostError();

    //작성자 일치 확인
    if (post.userId.toString() !== id) throw new UnAuthorizedError();

    //쿼리 실행
    await postService.updatePost(title, content, categoryIdx, postId);

    return res.status(statusCode.CREATED)
      .send(resFormatter.success(responseMessage.UPDATE_POST_SUCCESS));
  } catch (err) {
    next(err);
  }
}

//게시글 삭제
exports.deletePost = async (req, res, next) => {
  try {
    const id = req.decoded;
    const { postId } = req.params;

    //입력값 확인
    if (postId === undefined) throw new ValidationError()

    //사전 쿼리
    const post = await postService.readPost(postId);

    //게시글 유무
    if (post === null) throw new NotMatchedPostError()

    //작성자 일치 확인
    if (post.userId.toString() !== id) throw new UnAuthorizedError()

    //쿼리 실행
    await postService.destroyPost(postId);

    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.DELETE_POST_SUCCESS));
  } catch (err) {
    next(err);
  }
}

//게시글 검색
exports.getPostList = async (req, res, next) => {
  try {
    const { offset, limit } = req.query;

    //입력값 확인
    if (offset === undefined || limit === undefined) throw new ValidationError()

    //쿼리 실행
    const postList = await postService.readPostList(Number(offset), Number(limit));

    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.READ_POST_SUCCESS, postList));
  } catch (err) {
    next(err);
  }
}

exports.getSearchPost = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { offset, limit, title, content } = req.query;

    //입력값 확인
    if (offset === undefined || limit === undefined) throw new ValidationError()

    //쿼리 실행
    const postSearch = await postService.searchPost(categoryId, offset, limit, title, content);

    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.READ_POST_SUCCESS, postSearch));
  } catch (err) {
    next(err);
  }
}
