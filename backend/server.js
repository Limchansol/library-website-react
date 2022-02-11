const express = require("express");
const books = require("./books.js");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
