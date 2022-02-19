const express = require("express");
const data = require("./data.js");
const mongoose = require("mongoose"); //몽구스 연결
const { userRouter } = require("./routers/userRouter.js");
const { bookRouter } = require("./routers/bookRouter.js");
const cafeMenuRouter = require("./routers/cafeMenuRouter.js");

mongoose.connect("mongodb://localhost/minilibrary");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //qs모듈을 사용해서 해석하도록(extended가 true), 객체의 깊이가 있을 경우 qs와 querystring모듈 2개가 다르게 parse한다.

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);
app.use("/api/cafeMenu", cafeMenuRouter);

//요청한 페이지가 존재하지 않으면 404에러
app.use((req, res, next) => {
  res.status(404).send("not found");
});
//expressAsyncHandler와 함께 쓰면 강력한 에러처리 코드가 된다. 저것을 쓰면 발생한 오류는 모두 아래 오류처리 미들웨어로 넘어온다.
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
