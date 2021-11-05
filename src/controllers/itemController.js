const { resFormatter } = require('../utils');
const { statusCode, responseMessage } = require('../globals');
const { ValidationError, NotExistError, EntityNotExistError } = require('../utils/errors/tagError');

const itemService = require('../services/itemService.js');
const logger = require('../utils/logger');
const menuService = require('../services/menuService');
const { NotMatchedPostError: NotMatchedMenuError } = require('../utils/errors/menuError');

// 아이템 생성
exports.postItem = async (req, res, next) => {
	try {
		const { size, name, price } = req.body;
		const menuId = Number(req.params.menuId);

		//입력값 확인
		if (size === undefined || name === undefined || price === undefined || isNaN(menuId))
			throw new ValidationError();

		//DB에 없으면 에러처리 
		const menu = await menuService.readMenu(menuId);
		if (menu === null) throw new NotMatchedMenuError();

		//쿼리실행
		let item = await itemService.createItem(menuId, size, name, price);

		return res.status(statusCode.CREATED)
			.send(resFormatter.success(responseMessage.CREATE_ITEM_SUCCESS, { id: item.id }))
	} catch (err) {
		next(err);
	}
};


// 아이템 수정
exports.updateItem = async (req, res, next) => {
	try {
		const { size, name, price, isSold } = req.body;
		const itemId = Number(req.params.itemId);

		//입력값 확인
		if ((size === undefined && name === undefined && price === undefined) || isNaN(itemId))
			throw new ValidationError();

		//쿼리실행
		let item = await itemService.updateItem(itemId, size, name, price, isSold);

		//아이템 유무 확인
		if (!item[0]) throw new EntityNotExistError();

		return res.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.UPDATE_ITEM_SUCCESS));
	} catch (err) {
		next(err);
	}
};


// 아이템 삭제
exports.deleteItem = async (req, res, next) => {
	try {
		let itemId = Number(req.params.itemId);

		//아이템 확인
		if (isNaN(itemId)) throw new ValidationError();

		//쿼리실행
		let item = await itemService.deleteItem(itemId);

		//아이템 유무 확인
		if (!item) throw new EntityNotExistError();

		return res.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.DELETE_ITEM_SUCCESS));
	} catch (err) {
		next(err);
	}
};
