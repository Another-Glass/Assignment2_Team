const express = require("express");
const routes = require('../globals').routes;

const userController = require('../controllers/userController.js');

const userRouter = express.Router();

//유저생성
userRouter.post(routes.signup, userController.postSignup);
//토큰생성
userRouter.post(routes.signin, userController.postSignin);

module.exports = userRouter;