const { statusCode, responseMessage } = require('../globals');
const encryption = require('../libs/encryption.js');
const jwt = require('../libs/jwt.js');
const { resFormatter, logger } = require('../utils');
const { ValidationError, DuplicatedError, PasswordMissMatchError, NotMatchedUserError } = require('../utils/errors/userError');

const userService = require('../services/userService.js');

//회원가입
exports.postSignup = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;

    //입력값 확인
    if (name === undefined || email === undefined || password === undefined || password2 === undefined) {
      throw new ValidationError();
    }

    const isEmail = await userService.checkEmail(email);

    //이메일 중복
    if (isEmail) throw new DuplicatedError()

    //패스워드 불일치
    if (password !== password2) throw new PasswordMissMatchError()

    //암호화
    const salt = encryption.makeSalt();
    const encryptPassword = encryption.encrypt(password, salt);

    //쿼리실행
    await userService.signup(name, email, encryptPassword, salt);

    return res.status(statusCode.CREATED)
      .send(resFormatter.success(responseMessage.CREATED_USER));
  } catch (err) {
    next(err);
  }
}

//토큰 생성
exports.postSignin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //입력값 확인
    if (email === undefined || password === undefined) throw new ValidationError();

    const isEmail = await userService.checkEmail(email);

    //이메일 중복
    if (!isEmail) throw new NotMatchedUserError();


    //확인용 암호화
    const { salt, password: realPassword } = isEmail;

    const inputPassword = encryption.encrypt(password, salt);

    //패스워드 불일치
    if (inputPassword !== realPassword) throw new PasswordMissMatchError();

    //쿼리 실행
    const user = await userService.signin(email, inputPassword);

    //토큰 반환
    const { accessToken, refreshToken } = await jwt.sign(user);

    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.LOGIN_SUCCESS, { accessToken, refreshToken }))
  } catch (err) {
    next(err);
  }
}