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

exports.readTagList = async () => {
  try {
    const allTags = await models.tag.findAll();
    return allTags;
  } catch (err) {
    throw err;
  }
};

exports.deleteConnectedMenu = async (menuId, tagId) => {
  try {
    const selectedMenu = await models.menu.findByPk(menuId);
    const selectedTag = await models.tag.findByPk(tagId);
    const deletedTag = await selectedMenu.removeMenuTag(selectedTag);
    return deletedTag;
  } catch (err) {
    throw err;
  }
};

exports.connectToMenu = async (menuId, tagId) => {
  try {
    const selectedMenu = await models.menu.findByPk(menuId);
    const selectedTag = await models.tag.findByPk(tagId);
    const addedTag = await selectedMenu.addMenuTag(selectedTag);
    return addedTag;
  } catch (err) {
    throw err;
  }
};
