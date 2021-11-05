const { resFormatter } = require('../utils');
const { statusCode, responseMessage } = require('../globals');
const { ValidationError, NotExistError } = require('../utils/errors/tagError');

const itemService = require('../services/itemService.js');

// 아이템 생성
exports.postItem = async (req, res, next) => {
	try {
		const { size, name, price } = req.body;
		const menuId = req.params.menuId;

		//입력값 확인
		if (size === undefined || name === undefined || price === undefined)
			throw new ValidationError();

		//쿼리실행
		let id = await itemService.createItem(menuId, size, name, price);
		return res.status(statusCode.CREATED)
			.send(resFormatter.success(responseMessage.CREATE_ITEM_SUCCESS, { id: id }))
	} catch (err) {
		next(err);
	}
};

// 아이템 수정
exports.updateItem = async (req, res, next) => {
	try {
		const { size, name, price } = req.body;
		const itemId = req.params.itemId;

		//입력값 확인
		if (size === undefined && name === undefined && price === undefined)
			throw new ValidationError();

		//쿼리실행
		let id = await itemService.updateItem(itemId, size, name, price);

		//id 유무 확인
		if (!id) throw new NotExistError();

		return res.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.UPDATE_ITEM_SUCCESS));
	} catch (err) {
		next(err);
	}
};

// 아이템 삭제
exports.deleteItem = async (req, res, next) => {
	try {
		const itemId = req.params.itemId;

		//아이템 확인
		if (paramId === undefined) throw new ValidationError();

		const id = await itemService.deleteItem(itemId);

		//id 유무 확인
		if (!id) throw new NotExistError();

		return res.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.DELETE_ITEM_SUCCESS));
	} catch (err) {
		next(err);
	}
};
