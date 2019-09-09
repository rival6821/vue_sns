const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const db = require("./models");
const app = express();

db.sequelize.sync();

app.use(cors("http://localhost:3000"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("안녕!!");
});

// 회원가입
app.post("/user", async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12);

    //이메일 중복체크
    const exUser = await db.User.findOne({
      email: req.body.email
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
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

app.listen(3085, () => {
  console.log(`http://localhost:3085 번 포트에서 작동중`);
});
