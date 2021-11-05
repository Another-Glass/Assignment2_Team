const models = require('../models');
const { EntityNotExistError } = require('../utils/errors/tagError');
const logger = require('../utils/logger');

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

    logger.log("as" + tags);

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

exports.readTagList = async (tagId) => {
  try {
    const tag = await models.tag.findByPk(tagId);

    return tag;
  } catch (err) {
    throw err;
  }
};


exports.deleteConnectedMenu = async (menuId, tagId) => {
  try {
    const selectedMenu = await models.menu.findByPk(menuId);
    const selectedTag = await models.tag.findByPk(tagId);

    if (!selectedMenu || !selectedTag) throw new EntityNotExistError();

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

    if (!selectedMenu || !selectedTag) throw new EntityNotExistError();

    const addedTag = await selectedMenu.addMenuTag(selectedTag);

    return addedTag;
  } catch (err) {
    throw err;
  }
};

