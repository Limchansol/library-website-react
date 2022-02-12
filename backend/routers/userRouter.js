const express = require("express");
const User = require("../models/userModel.js");
const data = require("../data.js");
const expressAsyncHandler = require("express-async-handler");

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users); //model.insertMany: 여러 개의 모델들을 한번에 저장.
    //원래는 users1.save(), users2.save()이런 식으로 가능.
    //콜백으로 저장한 모델을 리턴함.
    res.send({ createdUsers });
  }) //expressAsyncHandler: 발생한 모든 에러를 server.js에 있는 에러 처리 코드로 넘겨준다.
);

exports.userRouter = userRouter;
