const jsonwebtoken = require('jsonwebtoken');
const secretKey = require('../configs/secretKey.js');
const userService = require('../services/userService.js');
const logger = require('../utils/logger.js');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    //토큰 생성
    sign: async user => {
        const payload = {
            "domain": user.domain,
            "username": user.username,
            "isAdmin": user.isAdmin
        };

        const result = {
            accessToken: jsonwebtoken.sign(payload, secretKey.secretKey, secretKey.options),
            //refreshToken: jsonwebtoken.sign(payload, secretKey.secretKey, secretKey.refreshOpti ons)
        };

        return result;
    },


    //토큰 복호화
    verify: async (token) => {
        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, secretKey.secretKey);
        } catch (err) {
            if (err.message === 'jwt expired') return TOKEN_EXPIRED;
            if (err.message === 'invalid token') return TOKEN_INVALID;
            return TOKEN_INVALID;
        }
        return decoded;
    },


    /*
    refresh: async refreshToken => {
        try {
            const result = jsonwebtoken.verify(refreshToken, secretKey.secretKey);
            if (result.id === undefined) return TOKEN_INVALID;

            const user = await userService.checkUserId(result.id);
            if (refreshToken !== user.refreshToken) return TOKEN_INVALID;

            const payload = {
                id: user.id,
                name: user.name,
                isAdmin: user.isAdmin
            };
            const dto = {
                accessToken: jsonwebtoken.sign(payload, secretKey.secretKey, secretKey.options),
                refreshToken: jsonwebtoken.sign(payload, secretKey.secretKey, secretKey.refreshOptions),
            };
            await userService.updateRefreshToken(user.id, dto.refreshToken);
            return dto;
        } catch (err) {
            if (err.message === 'jwt expired') return TOKEN_EXPIRED;
            if (err.message === 'invalid token') return TOKEN_INVALID;
            return TOKEN_INVALID;
        }
    }
    */
}