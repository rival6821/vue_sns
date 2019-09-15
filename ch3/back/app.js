const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");

const db = require("./models");
const passportConfig = require("./passport");
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

// 회원가입
app.post("/user", async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12);

    //이메일 중복체크
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (exUser) {
      return status(403).json({
        errorCode: 1,
        message: "이미 회원가입되어있습니다."
      });
    }
    const newUser = await db.User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hash
    });
    return res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

//로그인
app.post("/user/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async err => {
      // 세션에 사용자 정보 저장
      if (err) {
        console.error(err);
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

// 게시글 작성
app.post("/post", (res, req) => {
  if (res.isAuthenticated()) {
  }
});

app.listen(3085, () => {
  console.log(`http://localhost:3085 번 포트에서 작동중`);
});
