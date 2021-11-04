const models = require('../models');

exports.signup = async (name, email, password, salt) => {
  try {
    const user = await models.user.create({
      name: name,
      email: email,
      password: password,
      salt: salt,
    });
    return user;
  } catch (err) {
    throw err;
  }
}

exports.checkEmail = async email => {
  try {
    const alreadyEmail = await models.user.findOne({
      email: email
    });
    return alreadyEmail;
  } catch (err) {
    throw err;
  }
}

exports.signin = async (email, password) => {
  try {
    const user = await models.user.findOne({
      email: email,
      password: password
    });
    return user;
  } catch (err) {
    throw err;
  }
}

exports.updateRefreshToken = async (id, refreshToken) => {
  try {
    const user = await models.user.findOneAndUpdate(
      {
        _id: id
      },
      {
        refreshToken: refreshToken
      }
    );
    return user;
  } catch (err) {
    throw err;
  }
}