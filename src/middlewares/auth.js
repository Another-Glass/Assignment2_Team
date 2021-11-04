const jwt = require('../libs/jwt.js');
const util = require('../utils/resFormatter.js');
const statusCode = require('../globals').statusCode;
const responseMessage = require('../globals').statusCode;

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

exports.checkToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(statusCode.FORBIDDEN)
            .send(util.fail(statusCode.FORBIDDEN, responseMessage.EMPTY_TOKEN));
    }
    const user = await jwt.verify(token);

    if (user === TOKEN_EXPIRED) {
        return res.status(statusCode.FORBIDDEN)
            .send(util.fail(statusCode.FORBIDDEN, responseMessage.EXPIRED_TOKEN));
    }
    if (user === TOKEN_INVALID) {
        return res.status(statusCode.FORBIDDEN)
            .send(util.fail(statusCode.FORBIDDEN, responseMessage.INVALID_TOKEN));
    }
    if (user.id === undefined) {
        return res.status(statusCode.FORBIDDEN)
            .send(util.fail(statusCode.FORBIDDEN, responseMessage.INVALID_TOKEN));
    }
    req.decoded = user.id;
    next();
}