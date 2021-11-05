const express = require("express");
const routes = require('../globals').routes;

const userController = require('../controllers/userController.js');

const userRouter = express.Router();

//유저생성
userRouter.post(routes.root, userController.postUser);

//토큰생성
userRouter.post(routes.token, userController.postToken);

module.exports = userRouter;