const express = require("express");
const routes = require('../globals').routes;

const { checkToken } = require('../middlewares/auth.js');
const menuController = require('../controllers/menuController.js');

const menuRouter = express.Router();

//전체 메뉴 조회
menuRouter.get(routes.menuPage, checkToken, menuController.getMenuList);

//메뉴 추가
menuRouter.post(routes.menu , checkToken, menuController.postMenu);

//메뉴 상세조회
menuRouter.get(routes.menu + routes.menuDetail, checkToken, menuController.getMenu);

//메뉴 수정
menuRouter.put(routes.menu + routes.menuDetail, checkToken, menuController.putMenu)

//메뉴 삭제
menuRouter.delete(routes.menu + routes.menuDetail, checkToken, menuController.deleteMenu)


module.exports = menuRouter;