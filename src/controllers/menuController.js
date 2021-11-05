const { resFormatter, logger } = require('../utils');
const { statusCode, responseMessage } = require('../globals');

const menuService = require('../services/menuService.js');

const { ValidationError, NotMatchedPostError, UnAuthorizedError } = require('../utils/errors/menuError');


//메뉴 추가
exports.postMenu = async (req, res, next) => {
  try {
    const id = req.decoded;
    const { category , name , description  } = req.body;

    //입력값 확인
    if (category === undefined || name === undefined || description === undefined) throw new ValidationError()

    //쿼리실행
    let menu = await menuService.createPost(category, name, description, id);
    
    //Respons Code : 201
    return res.status(statusCode.CREATED)
      .send(resFormatter.success(responseMessage.CREATE_MENU_SUCCESS, { id : id }));
  } catch (err) {
    next(err);
  }
}

//메뉴 조회
exports.getMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;

    //입력값 확인
    if (menuId === undefined) throw new ValidationError();

    //쿼리 실행
    const menu = await menuService.readPost(menuId);

    //메뉴 유무 확인후 
    if (menu === null) throw new NotMatchedPostError();

    //Response Code : 200 
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.READ_MENU_SUCCESS,  menu ));
  } catch (err) {
    next(err);
  }
}

//메뉴 수정
exports.putMenu = async (req, res, next) => {
  try {
    const id = req.decoded;
    const { menuId } = req.params;
    const { category , name , description ,  isSold , badge } = req.body;

    //입력값 확인
    if (category === undefined || name === undefined || description === undefined || isSold === undefined || badge === undefined) {
      throw new ValidationError();
    }

    //사전 쿼리
    const menu = await menuService.readPost(menuId);

    //메뉴 유무 확인 후 에러처리
    if (menu === null) throw new NotMatchedPostError();

    
    //쿼리 실행
    await menuService.updatePost(category, name, description, isSold, badge, menuId);

    //Response 204 NO_CONTENT
    return res.status(statusCode.NO_CONTENT)
      .send(resFormatter.success(responseMessage.UPDATE_MENU_SUCCESS));
  } catch (err) {
    next(err);
  }
}

//메뉴 삭제
exports.deleteMenu = async (req, res, next) => {
  try {
    const id = req.decoded;
    const { menuId } = req.params;

    //입력값 확인
    if (menuId === undefined) throw new ValidationError()

    //사전 쿼리
    const menu = await menuService.readPost(menuId);

    //메뉴 유무
    if (menu === null) throw new NotMatchedPostError()

    //쿼리 실행
    await menuService.destroyPost(menuId);
    
    //Response Code : 204
    return res.status(statusCode.NO_CONTENT)
      .send(resFormatter.success(responseMessage.DELETE_MENU_SUCCESS));
  } catch (err) {
    next(err);
  }
}

//전체 메뉴 조회(페이지네이션 필요)
exports.getMenuList = async (req, res, next) => {
  try {
    const { page } = req.query;

    //입력값 확인
    if (page === undefined) throw new ValidationError()

    //쿼리 실행
    const menuList = await menuService.readPostList(Number(page));
    //Response Code : 200
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.READ_MENU_SUCCESS, menuList));
  } catch (err) {
    next(err);
  }
}
