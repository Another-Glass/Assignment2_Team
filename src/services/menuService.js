const models = require('../models');
const logger = require('../utils/logger');

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

exports.readMenu = async menuId => {
  try {
    const readMenu = await models.menu.findByPk(menuId);
    return readMenu;
  } catch (err) {
    throw err;
  }
};

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

