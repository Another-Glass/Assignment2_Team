const { resFormatter } = require('../utils');
const { statusCode, responseMessage } = require('../globals');
const { ValidationError, NotExistError } = require('../utils/errors/tagError');

const tagService = require('../services/tagService.js');
const logger = require('../utils/logger');


exports.postTag = async (req, res, next) => {
	try {
		const { type, name } = req.body;

		//입력값 확인
		if (type === undefined || name === undefined) throw new ValidationError();

		//쿼리실행
		let tag = await tagService.createTag(type, name);

		return res.status(statusCode.CREATED)
			.send(resFormatter.success(responseMessage.CREATE_TAG_SUCCESS, { id: tag.id }))

	} catch (err) {
		next(err);
	}
};


// 태그 수정
exports.updateTag = async (req, res, next) => {
	try {
		const { type, name } = req.body;
		const tagId = Number(req.params.tagId);

		//입력값 확인
		if (type === undefined && name === undefined && isNaN(tagId)) throw new ValidationError();

		//쿼리실행
		let result = await tagService.updateTag(tagId, type, name);

		//DB에 없으면 에러
		if (!result[0]) throw new EntityNotExistError();

		return res.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.UPDATE_TAG_SUCCESS));

	} catch (err) {
		next(err);
	}
}


// 태그 삭제
exports.deleteTag = async (req, res, next) => {
	try {
		const tagId = Number(req.params.tagId);

		//입력값 확인
		if (isNaN(tagId)) throw new ValidationError();

		let result = await tagService.deleteTag(tagId);

		//id 유무 확인
		if (!result) throw new NotExistError();

		return res.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.DELETE_TAG_SUCCESS));

	} catch (err) {
		next(err);
	}
}


// 태그 조회
exports.getTagList = async (req, res, next) => {
	try {
		//쿼리 실행
		let tags = await tagService.readTagList();

		return res.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.READ_TAG_SUCCESS, tags));
	} catch (err) {
		next(err);
	}
}


// 태그 연결 추가
exports.postConnectTag = async (req, res, next) => {
	try {
		const menuId = Number(req.params.tagId);
		const tagId = Number(req.params.tagId);

		//입력값 확인
		if (isNaN(menuId) || isNaN(tagId)) throw new ValidationError();

		//쿼리 실행
		let result = await tagService.connectToMenu(menuId, tagId);

		//성공 확인
		if (!result) throw new NotExistError();

		return res.status(statusCode.CREATED)
			.send(resFormatter.success(responseMessage.CONNECT_TAG_SUCCESS));
	} catch (err) {
		next(err);
	}
};


// 태그 연결 삭제
exports.deleteConnectedTag = async (req, res, next) => {
	try {
		const menuId = Number(req.params.tagId);
		const tagId = Number(req.params.tagId);

		//입력값 확인
		if (isNaN(menuId) || isNaN(tagId)) throw new ValidationError();

		//쿼리 실행
		let result = await tagService.deleteConnectedMenu(menuId, tagId);

		//성공 확인
		if (!result) throw new NotExistError();

		return res.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.DECONNECT_TAG_SUCCESS));
	} catch (err) {
		next(err);
	}
};
