const models = require('../models');
const { EntityNotExistError } = require('../utils/errors/tagError');
const logger = require('../utils/logger');

/**
 * 태그 생성 서비스
 * @param {String} type
 * @param {String} name
 * @returns {Object} 생성한 태그 정보 { id, type, name, createdAt, updatedAt }
 */
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

/**
 * 태그 업데이트 서비스
 * @param {Integer} id
 * @param {String} type
 * @param {String} name
 * @returns {Array<Integer>} 업데이트한 태그 id
 */
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

/**
 * 태그 삭제 서비스
 * @param {Integer} id
 * @returns {Integer} 삭제된 행의 개수
 */
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

/**
 * 태그 전체 목록 가져오기
 * @returns {Array<Object>} 모든 태그 목록
 */
exports.readTagList = async () => {
  try {
    const allTags = await models.tag.findAll();
    console.log("hi", allTags);
    return allTags;
  } catch (err) {
    throw err;
  }
};


/**
 * 메뉴와 태그 연결 해제
 * @param {Integer} menuId
 * @param {Integer} tagId
 * @returns {Promise}
 */
exports.deleteConnectedMenu = async (menuId, tagId) => {
  try {
    const selectedMenu = await models.menu.findByPk(menuId);
    const selectedTag = await models.tag.findByPk(tagId);

    if (selectedMenu == undefined || selectedTag == undefined) throw new EntityNotExistError();

    const deletedTag = await selectedMenu.removeMenuTag(selectedTag);

    return deletedTag;
  } catch (err) {
    throw err;
  }
};

/**
 * 메뉴와 태그 연결 추가
 * @param {Integer} menuId
 * @param {Integer} tagId
 * @returns {Promise}
 */
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
