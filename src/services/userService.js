const models = require('../models');

/**
 * 회원가입 서비스
 * @param {String} emailUsername
 * @param {String} emailDomain
 * @param {String} encryptPassword
 * @param {String} salt
 * @param {Boolean} isAdmin
 * @returns {Object} { username, domain, password, isAdmin, salt, refreshToken, createdAt, updatedAt }
 */
exports.signup = async (
  emailUsername,
  emailDomain,
  encryptPassword,
  salt,
  isAdmin,
) => {
  try {
    const newUser = await models.user.create({
      username: emailUsername,
      domain: emailDomain,
      password: encryptPassword,
      salt,
      isAdmin,
    });
    return newUser;
  } catch (err) {
    throw err;
  }
};

/**
 * 이메일 체크 서비스
 * @param {String} emailUsername
 * @param {String} emailDomain
 * @returns {Object} { username, domain, password, isAdmin, salt, refreshToken, createdAt, updatedAt }
 */
exports.checkEmail = async (emailUsername, emailDomain) => {
  try {
    const alreadyUser = await models.user.findOne({
      username: emailUsername,
      domain: emailDomain,
    });
    return alreadyUser;
  } catch (err) {
    throw err;
  }
};

/**
 * 로그인 서비스
 * @param {String} emailUsername
 * @param {String} emailDomain
 * @param {String} password
 * @returns {Object} { username, domain, password, isAdmin, salt, refreshToken, createdAt, updatedAt }
 */
exports.signin = async (emailUsername, emailDomain, password) => {
  try {
    const user = await models.user.findOne({
      username: emailUsername,
      domain: emailDomain,
      password,
    });
    return user;
  } catch (err) {
    throw err;
  }
};

// exports.updateRefreshToken = async (emailUsername, emailDomain, refreshToken) => {
//   try {

//     return user;
//   } catch (err) {
//     throw err;
//   }
// }
