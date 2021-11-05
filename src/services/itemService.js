const models = require('../models');

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

exports.updateItem = async (id, size, name, price) => {
  try {
    const updatedItem = await models.item.update(
      {
        size,
        name,
        price,
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
