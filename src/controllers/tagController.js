const { resFormatter } = require('../utils');
const { statusCode, responseMessage } = require('../globals');
const { ValidationError, NotExistError } = require('../utils/errors/tagError');

// 태그 생성
exports.postTag = async (req, res, next) => {
		try {
			const { type, name } = req.body;

			//입력값 확인
			if (type === undefined || name === undefined) throw new ValidationError();

			//쿼리실행
			let id = await tagService.create(type, name);
			return res.status(statusCode.OK)
      	.send(resFormatter.success(responseMessage.CREATE_TAG_SUCCESS, { id : id }))
		} catch (err) {
			next(err);
		}
};

// 태그 수정
exports.updateTag = async (req, res, next) => {
	try {
		const { type, name } = req.body;

			//입력값 확인
			if (type === undefined || name === undefined) throw new ValidationError();

			//쿼리실행
			let id = await tagService.update(type, name);

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
		const paramId = req.params.id;

		//태그 확인
		if (paramId === undefined) throw new ValidationError();
		
		const id = await tagService.delete(paramId);

		//id 유무 확인
		if (!id) throw new NotExistError();

		return res.status(statusCode.NO_CONTENT)
      	.send(resFormatter.success(responseMessage.DELETE_TAG_SUCCESS));
	} catch (err) {
		next(err);
	}
}

exports.getTag = async (req, res, next) => {
	try {
		const paramId = req.params.id;

		//입력값 확인
		if (paramId === undefined) throw new ValidationError();

		//쿼리 실행
		const tag = await tagService.getById(paramId);

		//태그 유무 확인
		if (!tag) throw new NotExistError();

		return res.status(statusCode.OK)
      	.send(resFormatter.success(responseMessage.READ_TAG_SUCCESS, tag ));
	} catch (err) {
		next(err);
	}
}