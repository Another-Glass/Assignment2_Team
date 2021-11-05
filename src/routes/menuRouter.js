const express = require("express");
const routes = require('../globals').routes;

const { checkToken } = require('../middlewares/auth.js');
const menuController = require('../controllers/menuController.js');
const tagController = require('../controllers/tagController.js');
const itemController = require('../controllers/itemController.js');

const menuRouter = express.Router();


//default = "/menus"

//전체 메뉴 조회
menuRouter.get(routes.root , menuController.getMenuList);

//메뉴 추가
menuRouter.post(routes.root , checkToken, menuController.postMenu);

//단일 메뉴 조회
menuRouter.get(routes.menuDetail, menuController.getMenu);

//메뉴 수정
menuRouter.put(routes.menuDetail, checkToken, menuController.putMenu);

//메뉴 삭제
menuRouter.delete(routes.menuDetail, checkToken, menuController.deleteMenu);


//태그 연결 추가
menuRouter.post(routes.menuDetail + routes.tag, checkToken, tagController.postConnectTag);

//태그 연결 삭제
menuRouter.delete(routes.menuDetail + routes.tag, checkToken, tagController.deleteConnectedTag);


// 아이템 생성(관리자 전용)
menuRouter.post(routes.menuDetail+routes.item, checkToken, itemController.postItem);

// 아이템 수정(관리자 전용)
menuRouter.put(routes.menuDetail+routes.item+routes.menuDetail, checkToken, itemController.updateItem);

// 아이템 삭제(관리자 전용)
menuRouter.delete(routes.menuDetail+routes.item+routes.menuDetail, checkToken, itemController.deleteItem);


module.exports = menuRouter;