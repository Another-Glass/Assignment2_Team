const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

//Code : 해당 url 미존재 
class NoPageError extends Error {
  constructor(message = responseMessage.NO_PAGE_ERROR, status = statusCode.NOT_FOUND) {
    super(message);
    this.status = status;
  }
}

module.exports.NoPageError = NoPageError;