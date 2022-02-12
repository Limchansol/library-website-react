const express = require("express");
const data = require("./data.js");
const mongoose = require("mongoose"); //몽구스 연결
const { userRouter } = require("./routers/userRouter.js");
const expressAsyncHandler = require("express-async-handler");

mongoose.connect("mongodb://localhost/minilibrary");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/books", (req, res) => {
  res.send(data.books);
});

app.use("/api/users", userRouter);

//expressAsyncHandler와 함께 쓰면 강력한 에러처리 코드가 된다. 저것을 쓰면 발생한 오류는 모두 아래 오류처리 미들웨어로 넘어온다.
app.use((req, res, next) => {
  res.status(404).send("not found");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
