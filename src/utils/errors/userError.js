const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

class ValidationError extends Error { // 400
  constructor(message = responseMessage.NULL_VALUE , status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
};

class DuplicatedError extends Error { // 403
  constructor(message = responseMessage.DUPLICATE_ERROR , status = statusCode.FORBIDDEN) {
    super(message);
    this.status = status;
  } 
}

class PasswordMissMatchError extends Error { // 400
  constructor(message = responseMessage.MISS_MATCH_PW , status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  }  
}

class NotMatchedUserError extends Error { // 400
  constructor(message = responseMessage.NO_USER , status = statusCode.NOT_FOUND) {
    super(message);
    this.status = status;
  }  
}

module.exports.ValidationError = ValidationError;
module.exports.DuplicatedError = DuplicatedError;
module.exports.PasswordMissMatchError = PasswordMissMatchError;
module.exports.NotMatchedUserError = NotMatchedUserError;