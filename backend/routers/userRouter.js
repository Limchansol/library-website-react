const express = require("express");
const User = require("../models/userModel.js");
const data = require("../data.js");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { generateToken } = require("../utils.js");

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

userRouter.post(
  "/logIn",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ id: req.body.id });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
      res.status(401).send({ message: "there are no user like this" });
    } else {
      res.status(401).send({ message: "there are no user like this" });
    }
  })
);

userRouter.post(
  "/signUpChecker",
  expressAsyncHandler(async (req, res) => {
    const tryId = req.body.id;
    const beforeUser = await User.findOne({ id: tryId });
    if (beforeUser) {
      res.send({ message: "there is already user had this id!", valid: false });
      return; //아이디 중복가입 방지
    }
    res.send({ message: "you can use it", valid: true });
  })
);

userRouter.post(
  "/signUp",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      id: req.body.id,
      password: bcrypt.hashSync(req.body.password, 10),
      isAdmin: false,
      phone: req.body.phone,
      gender: req.body.gender,
      yyyy: req.body.yyyy,
      mm: req.body.mm,
      dd: req.body.dd,
      email: req.body.email,
    });
    const beforeUser = await User.findOne({ id: newUser.id });
    if (beforeUser) {
      res.send({ message: "there is already user had this id!" });
      return; //아이디 중복가입 방지
    }
    newUser.save();
    res.send(newUser);
  })
);

exports.userRouter = userRouter;
