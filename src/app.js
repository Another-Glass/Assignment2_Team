const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const { logger, resFormatter } = require('./utils');
const { statusCode, routes, responseMessage } = require('./globals')


const globalRouter = require('./routes/globalRouter');
const userRouter = require('./routes/userRouter');
const tokenRouter = require('./routes/tokenRouter');
const menuRouter = require('./routes/menuRouter');
const tagRouter = require('./routes/tagRouter');

//DB연결

//서버 사전작업
const app = express();

//미들웨어 설정
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//라우터 설정
app.use(routes.root, globalRouter);
app.use(routes.user, userRouter);
app.use(routes.token, tokenRouter);
app.use(routes.menu, menuRouter);
app.use(routes.tag, tagRouter);

// 아래는 에러 핸들링 함수들

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  let errCode = err.status || statusCode.INTERNAL_SERVER_ERROR;
  let message = errCode == statusCode.INTERNAL_SERVER_ERROR ? responseMessage.INTERNAL_SERVER_ERROR : err.message;

  console.log("hi: ", err.message);

  return res.status(errCode)
    .send(resFormatter.fail(message));
});

module.exports = app;
