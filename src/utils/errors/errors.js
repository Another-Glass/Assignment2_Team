const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends MyError {
  constructor(message = responseMessage.NULL_VALUE , status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
};

class DuplicatedError extends MyError {
  constructor(message = responseMessage.DUPLICATE_ERROR , status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  } 
}

class PasswordMissMatch extends MyError {
  constructor(message = responseMessage.MISS_MATCH_PW , status = statusCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  }  
}

module.exports.ValidationError = ValidationError;
module.exports.DuplicatedError = DuplicatedError;
module.exports.PasswordMissMatch = PasswordMissMatch;