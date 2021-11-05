const models = require('../models');
const logger = require('../utils/logger');

/**
 * 메뉴 생성
 * @param {String} category
 * @param {String} name
 * @param {String} description
 * @returns {Object} 생성한 메뉴 정보 { id, category, name, description, isSold, badge, createdAt, updatedAt }
 */
exports.createMenu = async (category, name, description) => {
  try {
    const newMenu = await models.menu.create({
      category,
      name,
      description,
    });
    return newMenu;
  } catch (err) {
    throw err;
  }
};

/**
 * 메뉴 세부 정보 가져오기
 * @param {Integer} menuId
 * @returns {Object} 메뉴 세부 정보 { id, category, name, description, isSold, badge, createdAt, updatedAt }
 */
exports.readMenu = async menuId => {
  try {
    const readMenu = await models.menu.findByPk(menuId);
    return readMenu;
  } catch (err) {
    throw err;
  }
};

/**
 * 메뉴 업데이트
 * @param {Integer} id
 * @param {String} category
 * @param {String} name
 * @param {String} description
 * @param {Boolean} isSold
 * @param {String} badge
 * @returns {Array<Integer>} 업데이트한 메뉴 id
 */
exports.updateMenu = async (id, category, name, description, isSold, badge) => {
  try {
    const updatedMenu = await models.menu.update(
      {
        category,
        name,
        description,
        isSold,
        badge,
      },
      {
        where: { id },
      },
    );
    return updatedMenu;
  } catch (err) {
    throw err;
  }
};

/**
 * 메뉴 삭제하기
 * @param {Integer} menuId
 * @returns {Integer} 삭제된 행의 갯수
 */
exports.deleteMenu = async menuId => {
  try {
    const deletedMenu = await models.menu.destroy({
      where: { id: menuId },
    });
    return deletedMenu;
  } catch (err) {
    throw err;
  }
};

/**
 * 전체 메뉴 조회(페이지네이션 포함)
 * @param {Integer} page
 * @param {Integer} limit
 * @returns {Array<Object>} 페이지네이션된 메뉴 목록 배열
 */
exports.readMenuList = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const menuList = await models.menu.findAll({
      offset: offset,
      limit: limit,
    });
    
    return menuList;
  } catch (err) {
    throw err;
  }
};
