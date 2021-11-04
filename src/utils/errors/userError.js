const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

class ValidationError extends Error {
  constructor(message = responseMessage.NULL_VALUE , status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
};

class DuplicatedError extends Error {
  constructor(message = responseMessage.DUPLICATE_ERROR , status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  } 
}

class PasswordMissMatchError extends Error {
  constructor(message = responseMessage.MISS_MATCH_PW , status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  }  
}

class NotMatchedUserError extends Error {
  constructor(message = responseMessage.NO_USER , status = statusCode.NOT_FOUND) {
    super(message);
    this.status = status;
  }  
}

module.exports.ValidationError = ValidationError;
module.exports.DuplicatedError = DuplicatedError;
module.exports.PasswordMissMatchError = PasswordMissMatchError;
module.exports.NotMatchedUserError = NotMatchedUserError;