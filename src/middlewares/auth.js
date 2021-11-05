const jwt = require('../libs/jwt.js');
const util = require('../utils/resFormatter.js');
const statusCode = require('../globals').statusCode;
const responseMessage = require('../globals').statusCode;
//토큰 만료
const TOKEN_EXPIRED = -3;
//토큰 무효
const TOKEN_INVALID = -2;

exports.checkToken = async (req, res, next) => {
    const { token } = req.headers;

    //토큰이 없는경우
    if (!token) {
        return res.status(statusCode.UNAUTHORIZED)
            .send(util.fail(responseMessage.EMPTY_TOKEN));
    }

    //토큰 인증(확인)
    const user = await jwt.verify(token);

    //토큰 만료되는 경우 
    if (user === TOKEN_EXPIRED) {
        return res.status(statusCode.UNAUTHORIZED)
            .send(util.fail(responseMessage.EXPIRED_TOKEN));
    }

    //토큰 무효되는 경우
    if (user === TOKEN_INVALID) {
        return res.status(statusCode.UNAUTHORIZED)
            .send(util.fail(responseMessage.INVALID_TOKEN));
    }
    if (user.id === undefined) {
        return res.status(statusCode.UNAUTHORIZED)
            .send(util.fail(responseMessage.INVALID_TOKEN));
    }
    req.decoded = user.id;
    next();
}