const models = require('../models');

/**
 * 메뉴에 아이템 생성
 * @param {Integer} menuId
 * @param {String} size
 * @param {String} name
 * @param {Integer} price
 * @returns {Object} 생성한 아이템 정보 { id, name, size, price, isSold, createdAt, updatedAt }
 */
exports.createItem = async (menuId, size, name, price) => {
  try {
    const newItem = await models.item.create({
      size,
      name,
      price,
      menuId,
    });
    return newItem;
  } catch (err) {
    throw err;
  }
};

/**
 * 아이템 수정
 * @param {Integer} id
 * @param {String} size
 * @param {String} name
 * @param {Integer} price
 * @param {Boolean} isSold
 * @returns {Array<Integer>} 업데이트한 아이템 id
 */
exports.updateItem = async (id, size, name, price, isSold) => {
  try {
    const updatedItem = await models.item.update(
      {
        size,
        name,
        price,
        isSold,
      },
      {
        where: { id },
      },
    );
    return updatedItem;
  } catch (err) {
    throw err;
  }
};

/**
 * 아이템 삭제
 * @param {Integer} id
 * @returns {Integer} 삭제된 행의 갯수
 */
exports.deleteItem = async id => {
  try {
    const deletedItem = await models.item.destroy({
      where: { id },
    });
    return deletedItem;
  } catch (err) {
    throw err;
  }
};
