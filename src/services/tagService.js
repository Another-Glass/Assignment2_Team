const models = require('../models');

exports.createTag = async (type, name) => {
  try {
    const newTag = await models.tag.create({
      type,
      name,
    });
    return newTag;
  } catch (err) {
    throw err;
  }
};

exports.updateTag = async (id, type, name) => {
  try {
    const updatedTag = await models.tag.update(
      {
        type,
        name,
      },
      {
        where: { id },
      },
    );
    return updatedTag;
  } catch (err) {
    throw err;
  }
};

exports.deleteTag = async id => {
  try {
    const deletedTag = await models.tag.destroy({
      where: { id },
    });
    return deletedTag;
  } catch (err) {
    throw err;
  }
};

exports.readTag = async id => {
  try {
    const tag = await models.tag.findByPk(id);
    return tag;
  } catch (err) {
    throw err;
  }
};

exports.deleteConnectedMenu = async (menuId, arrTagId) => {};

exports.connectToMenu = async (menuId, arrTagId) => {};
