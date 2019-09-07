const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("안녕!");
});

app.listen(3085, () => {
  console.log(`http://localhost:3085 번 포트에서 작동중`);
});
