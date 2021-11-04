const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

class ValidationError extends Error {
  constructor(message = responseMessage.NULL_VALUE , status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
};

module.exports.ValidationError = ValidationError;
