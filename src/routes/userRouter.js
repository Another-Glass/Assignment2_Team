const express = require("express");
const routes = require('../globals/routes');

const userController = require('../controllers/userController.js');

const userRouter = express.Router();

//유저생성
userRouter.post(routes.root, userController.postUser);

module.exports = userRouter;