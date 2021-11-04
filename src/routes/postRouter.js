const express = require("express");
const routes = require('../globals').routes;

const { checkToken } = require('../middlewares/auth.js');
const postController = require('../controllers/postController.js');

const postRouter = express.Router();

//게시글 조회
postRouter.get(routes.root, postController.getPostList);
//게시글 생성
postRouter.post(routes.root, checkToken, postController.postPost);

//게시글 상세조회
postRouter.get(routes.postDetail, checkToken, postController.getPost);
//게시글 수정
postRouter.put(routes.postDetail, checkToken, postController.putPost);
//게시글 삭제
postRouter.delete(routes.postDetail, checkToken, postController.deletePost);
//게시글 검색
postRouter.get(routes.postSearch, postController.getSearchPost);


module.exports = postRouter;