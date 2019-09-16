const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../models");

const router = express.Router();

// 회원가입
router.post("/", async (req, res, next) => {
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
router.post("/login", async (req, res, next) => {
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

// 로그아웃
router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    req.session.destroy();
    return res.status(200).send("로그아웃 되었습니다.");
  }
});

module.exports = router;
