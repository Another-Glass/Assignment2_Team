const express = require("express");
const routes = require('../globals').routes;

const { checkToken } = require('../middlewares/auth.js');
const tagController = require('../controllers/tagController.js');

const tagRouter = express.Router();

// 태그 조회
tagRouter.get(routes.root, tagController.getTagList);

// 태그 생성(관리자 전용)
tagRouter.post(routes.root, checkToken, tagController.postTag);


// 태그 수정(관리자 전용)
tagRouter.put(routes.tagDetail, checkToken, tagController.updateTag);

// 태그 삭제(관리자 전용)
tagRouter.delete(routes.tagDetail, checkToken, tagController.deleteTag);



module.exports = tagRouter;