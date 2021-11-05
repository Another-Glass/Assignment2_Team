const { resFormatter, logger } = require('../utils');
const { statusCode, responseMessage } = require('../globals');

const menuService = require('../services/menuService.js');

const { ValidationError, NotMatchedPostError, UnAuthorizedError, NotNumberError } = require('../utils/errors/menuError');


//메뉴 추가
exports.postMenu = async (req, res, next) => {
  try {
    const isAdmin = req.decoded.isAdmin;
    const { category, name, description } = req.body;

    //관리자가 아니면 에러처리 UNAUTHORIZED: 401
    if (!isAdmin) throw new UnAuthorizedError();

    //입력값 없으면 에러처리 NULL_VALUE : 400
    if (category === undefined || name === undefined || description === undefined) throw new ValidationError()

    //쿼리실행
    let menu = await menuService.createMenu(category, name, description);

    //Respons Code : 201
    return res.status(statusCode.CREATED)
      .send(resFormatter.success(responseMessage.CREATE_MENU_SUCCESS, { id: menu.id }));

  } catch (err) {
    next(err);
  }
}


//메뉴 조회
exports.getMenu = async (req, res, next) => {
  try {
    const menuId = Number(req.params.menuId);

    //입력값 없으면 에러처리 NULL_VALUE : 400
    if (isNaN(menuId)) throw new ValidationError();

    //쿼리 실행
    const menu = await menuService.readMenu(menuId);

    //DB에 없으면 에러처리 
    if (menu === null) throw new NotMatchedPostError();

    //Response Code : 200 
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.READ_MENU_SUCCESS, menu));
  } catch (err) {
    next(err);
  }
}


//메뉴 수정
exports.putMenu = async (req, res, next) => {
  try {
    const isAdmin = req.decoded.isAdmin
    const menuId = Number(req.params.menuId);
    const { category, name, description, isSold, badge } = req.body;

    //관리자가 아니면 에러처리 UNAUTHORIZED: 401
    if (!isAdmin) throw new UnAuthorizedError();

    //입력값 없으면 에러처리 NULL_VALUE : 400
    if (category === undefined && name === undefined && description === undefined &&
      isSold === undefined && badge === undefined && isNaN(menuId)) {
      throw new ValidationError();
    }

    //쿼리 실행
    let result = await menuService.updateMenu(menuId, category, name, description, isSold, badge);

    //DB에 없으면 에러처리 
    if (!result[0]) throw new NotMatchedPostError()

    //Response 200 OK
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.UPDATE_MENU_SUCCESS));
  } catch (err) {
    next(err);
  }
}


//메뉴 삭제
exports.deleteMenu = async (req, res, next) => {
  try {
    const id = req.decoded.id;
    const isAdmin = req.decoded.isAdmin;
    const menuId = Number(req.params.menuId);

    //관리자가 아니면 에러처리 UNAUTHORIZED: 401
    if (!isAdmin) throw new UnAuthorizedError();

    //입력값 없으면 에러처리 NULL_VALUE : 400
    if (isNaN(menuId)) throw new ValidationError()

    //쿼리 실행
    let result = await menuService.deleteMenu(menuId);

    //DB에 없으면 에러처리 
    if (!result) throw new NotMatchedPostError()

    //Response 200 OK
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.DELETE_MENU_SUCCESS));
  } catch (err) {
    next(err);
  }
}


//전체 메뉴 조회(페이지네이션 필요)
exports.getMenuList = async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const limit = 5;

    //입력값 없으면 에러처리 NULL_VALUE : 400
    if (page === undefined) throw new ValidationError()

    //쿼리 실행
    const menuList = await menuService.readMenuList(page, limit);

    //Response 200 OK
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.READ_MENU_SUCCESS, menuList));
  } catch (err) {
    next(err);
  }
}
