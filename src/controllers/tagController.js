const { resFormatter } = require('../utils');
const { statusCode, responseMessage } = require('../globals');
const { ValidationError, NotExistError } = require('../utils/errors/tagError');

const tagService = require('../services/tagService.js');

exports.postTag = async (req, res, next) => {
		try {
			const { type, name } = req.body;

			//입력값 확인
			if (type === undefined || name === undefined) throw new ValidationError();

			//쿼리실행
			let id = await tagService.createTag(type, name);
		
			return res.status(statusCode.CREATED)
				.send(resFormatter.success(responseMessage.CREATE_TAG_SUCCESS, { id : id }))

		} catch (err) {
			next(err);
		}
};

// 태그 수정
exports.updateTag = async (req, res, next) => {
	try {
		const { type, name } = req.body;
		const paramId = req.params.tagId;

			//입력값 확인
			if (type === undefined && name === undefined && paramId === undefined) throw new ValidationError();

			//쿼리실행
			let id = await tagService.updateTag(paramId, type, name);


			//id 유무 확인
			if (!id) throw new NotExistError();

			return res.status(statusCode.NO_CONTENT)
				.send(resFormatter.success(responseMessage.UPDATE_TAG_SUCCESS));

	} catch (err) {
		next(err);
	}
}

// 태그 삭제
exports.deleteTag = async (req, res, next) => {
	try {
		const paramId = req.params.tagId;

		//태그 확인
		if (paramId === undefined) throw new ValidationError();
		
		const id = await tagService.deleteTag(paramId);


		//id 유무 확인
		if (!id) throw new NotExistError();

		return res.status(statusCode.NO_CONTENT)
      .send(resFormatter.success(responseMessage.DELETE_TAG_SUCCESS));

	} catch (err) {
		next(err);
	}
}

// 태그 조회
exports.getTag = async (req, res, next) => {
	try {
		//쿼리 실행
		const tag = await tagService.readTagList();

		//태그 유무 확인
		if (!tag) throw new NotExistError();

		return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.READ_TAG_SUCCESS, {data: tag}));
	} catch (err) {
		next(err);
	}
}

// 태그 연결 추가
exports.postConnectTag = async (req, res, next) => {
	try {
		const menuId = req.params.menuId;
		const tagId = req.body.tagId;

		//입력값 확인
		if (menuId === undefined || tagId === undefined) throw new ValidationError();
		
		//쿼리 실행
		const menu = await tagService.connectToMenu(menuId, tagId);

		//메뉴 유무 확인
		if (!menu) throw new NotExistError();

		return res.status(statusCode.CREATED)
      .send(resFormatter.success(responseMessage.CREATE_TAG_SUCCESS, { data: { result: menu }}));
	} catch (err) {
		next(err);
	}
};

// 태그 연결 삭제
exports.deleteConnectedTag = async (req, res, next) => {
	try {
		const menuId = req.params.menuId;
		const tagId = req.body.tagId;

		//입력값 확인
		if (menuId === undefined || tagId === undefined) throw new ValidationError();
		
		//쿼리 실행
		const menu = await tagService.deleteConnectedMenu(menuId, tagId);

		//메뉴 유무 확인
		if (!menu) throw new NotExistError();

		return res.status(statusCode.NO_CONTENT)
      .send(resFormatter.success(responseMessage.DELETE_TAG_SUCCESS, { data: { result: menu }}));
	} catch (err) {
		next(err);
	}
};
