const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");

const db = require("./models");
const passportConfig = require("./passport");
const usersRouter = require("./routers/user");
const app = express();

db.sequelize.sync();
passportConfig();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie("cookiesecret"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "cookiesecret",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).send("안녕!!");
});

app.use("/user", usersRouter);

// 게시글 작성
app.post("/post", (res, req) => {
  if (res.isAuthenticated()) {
  }
});

app.listen(3085, () => {
  console.log(`http://localhost:3085 번 포트에서 작동중`);
});
