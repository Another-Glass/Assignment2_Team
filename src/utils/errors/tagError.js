const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

class ValidationError extends Error { // 400
  constructor(message = responseMessage.NULL_VALUE , status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
};

class NotExistError extends Error { // 404
	constructor(message = responseMessage.NULL_VALUE , status = statusCode.NOT_FOUND) {
		super(message);
		this.status = status;
	}
}

module.exports.ValidationError = ValidationError;
module.exports.NotExistError = NotExistError;