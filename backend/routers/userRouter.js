const express = require("express");
const User = require("../models/userModel.js");
const data = require("../data.js");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { generateToken, checkValidToken } = require("../utils.js");

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

userRouter.get(
  "/checkLogIn",
  expressAsyncHandler(async (req, res) => {
    const token = checkValidToken(req.headers.token);
    if (!token._id) {
      res.send({ message: token });
      return;
    }
    const user = await User.findOne({ _id: token._id });
    res.send(user);
  })
);

userRouter.get(
  "/checkrefreshjwt", //refresh토큰 보내서 access토큰 재발급
  expressAsyncHandler(async (req, res) => {
    const token = checkValidToken(req.headers.token, "refresh");
    if (!token._id) {
      res.status(401).send({ message: token });
      return; //refresh토큰이 만료되거나 오류가 있는 경우
    }
    const user = await User.findOne({ _id: token._id });
    if (user.refresh !== req.headers.token) {
      res.status(401).send({ message: "refresh token invalid" }); //refresh토큰이 db에 저장된 것과 다를 경우
      return;
    }
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: {
        access: generateToken(user, "access"),
        refresh: user.refresh,
      },
    });
  })
);

userRouter.post(
  "/logIn",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ id: req.body.id });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const refTkn = generateToken(user, "refresh");
        await User.updateOne({ id: req.body.id }, { refresh: refTkn });
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: {
            access: generateToken(user, "access"),
            refresh: refTkn,
          },
        });
        return;
      }
      res.status(401).send({ message: "there are no user like this" });
    } else {
      res.status(401).send({ message: "there are no user like this" });
    }
  })
);

userRouter.get(
  "/rentalusersearch/:name",
  expressAsyncHandler(async (req, res) => {
    const { name } = req.params;
    const rentalUser = await User.find({ name: name });
    if (rentalUser.length === 0) {
      res.status(404).send({ message: "unchecked user" });
      return;
    }
    const zippedUserInfo = rentalUser.map((e) => {
      return { name: e.name, phone: e.phone };
    });
    res.send(zippedUserInfo);
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

userRouter.put(
  "/interestingBookUpdate",
  expressAsyncHandler(async (req, res) => {
    const token = checkValidToken(req.headers.token);
    if (!token._id) {
      res.send({ message: token });
      return;
    }
    const user = await User.updateOne(
      { _id: token._id },
      { $push: { interestingBooks: req.body.interestingBooks } }
    );
    res.send(user);
  })
);

userRouter.put(
  "/interestingBookDelete",
  expressAsyncHandler(async (req, res) => {
    const token = checkValidToken(req.headers.token);
    if (!token._id) {
      res.send({ message: token });
      return;
    }
    const { bookId } = req.body;
    const user = await User.updateOne(
      { _id: token._id },
      { $pullAll: { interestingBooks: [bookId] } }
    );
    if (!user) res.status(404).send({ message: "not found" });
    res.send(user);
  })
);

userRouter.put(
  "/reservedBookUpdate",
  expressAsyncHandler(async (req, res) => {
    const token = checkValidToken(req.headers.token);
    if (!token._id) {
      res.send({ message: token });
      return;
    }
    const user = await User.updateOne(
      { _id: token._id },
      { $push: { reservedBooks: req.body.reservedBooks } }
    );
    res.send(user);
  })
);

userRouter.put(
  "/reservedBookDelete",
  expressAsyncHandler(async (req, res) => {
    const token = checkValidToken(req.headers.token);
    if (!token._id) {
      res.send({ message: token });
      return;
    }
    const { bookId } = req.body;
    const user = await User.updateOne(
      { _id: token._id },
      { $pullAll: { reservedBooks: [bookId] } }
    );
    if (!user) res.status(404).send({ message: "not found" });
    res.send(user);
  })
);

userRouter.put(
  "/borrowedBookUpdate",
  expressAsyncHandler(async (req, res) => {
    const user = await User.updateOne(
      { $and: [{ name: req.body.name }, { phone: req.body.phone }] },
      { $push: { borrowedBooks: req.body.borrowedBooks } }
    );
    res.send(user);
  })
);

userRouter.put(
  "/borrowedBookDelete",
  expressAsyncHandler(async (req, res) => {
    const { title } = req.body;
    const user = await User.updateOne(
      { $and: [{ name: req.body.name }, { phone: req.body.phone }] },
      { $pull: { borrowedBooks: { title: title } } }
    );
    if (!user) res.status(404).send({ message: "not found" });
    res.send(user);
  })
);

userRouter.put(
  "/userUpdate",
  expressAsyncHandler(async (req, res) => {
    const token = checkValidToken(req.headers.token);
    if (!token._id) {
      res.send({ message: token });
      return;
    }
    const user = await User.updateOne({ _id: token._id }, req.body);
    res.send(user);
  })
);

userRouter.delete(
  "/secession/:userId",
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.deleteOne({ _id: userId });
    res.send(user);
  })
);

exports.userRouter = userRouter;
