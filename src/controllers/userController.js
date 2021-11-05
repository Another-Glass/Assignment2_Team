const { statusCode, responseMessage } = require('../globals');
const encryption = require('../libs/encryption.js');
const jwt = require('../libs/jwt.js');
const { resFormatter } = require('../utils');
const { ValidationError, DuplicatedError, PasswordMissMatchError, NotMatchedUserError } = require('../utils/errors/userError');

const userService = require('../services/userService.js');


//회원가입
exports.postUser = async (req, res, next) => {
  try {
    const { email, password, isAdmin } = req.body;
    
    //입력값 확인
    if (email === undefined || password === undefined) {
      throw new ValidationError();
    }
    const emailUsername = email.split('@')[0];
    const emailDomain = email.split('@')[1];
    
    //이메일 양식 일치/불일치 여부 : isMatch가 0이면 일치, -1이면 불일치
    const regExp = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    const isMatch = email.search(regExp);
    
    if (isMatch === -1) throw new ValidationError();
    
    //이메일 중복 여부
    const isEmail = await userService.checkEmail(emailUsername, emailDomain);
    //이메일 중복
    if (isEmail) throw new DuplicatedError()
    //암호화
    const salt = encryption.makeSalt();
    const encryptPassword = encryption.encrypt(password, salt);
    //쿼리실행
    await userService.signup(emailUsername, emailDomain , encryptPassword, salt, isAdmin);

    return res.status(statusCode.CREATED)
      .send(resFormatter.success(responseMessage.CREATED_USER));
  } catch (err) {
    next(err);
  }
}

//토큰 생성(로그인)
exports.postToken = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //입력값 확인
    if (email === undefined || password === undefined) throw new ValidationError();

    const emailUsername = email.split('@')[0];
    const emailDomain = email.split('@')[1];

    const isEmail = await userService.checkEmail(emailUsername, emailDomain);

    //이메일 존재
    if (!isEmail) throw new NotMatchedUserError();

    //확인용 암호화
    const { salt, password: realPassword } = isEmail;

    const inputPassword = encryption.encrypt(password, salt);

    //패스워드 불일치
    if (inputPassword !== realPassword) throw new PasswordMissMatchError();

    //쿼리 실행
    const user = await userService.signin(emailUsername, emailDomain, inputPassword);

    //토큰 반환
    const { accessToken, refreshToken } = await jwt.sign(user);
    
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.LOGIN_SUCCESS, { accessToken }))
  } catch (err) {
    next(err);
  }
}