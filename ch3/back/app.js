const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");
const dotenv = require("dotenv");

const prod = process.env.NODE_ENV === "production";
const db = require("./models");
const passportConfig = require("./passport");
const usersRouter = require("./routers/user");
const postRouter = require("./routers/post");
const postsRouter = require("./routers/posts");
const hashtagRouter = require("./routers/hashtag");
const app = express();

// db.sequelize.sync({ force: true });
db.sequelize.sync();
passportConfig();

dotenv.config();

if (prod) {
  app.use(helmet());
  app.use(hpp());
  app.use(morgan("combined"));
  app.use(
    cors({
      origin: "",
      credentials: true
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );
}

app.use("/", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: prod && ".ilhoon.kr"
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).send("안녕!!");
});

app.use("/user", usersRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/hashtag", hashtagRouter);

app.listen(prod ? process.env.PORT : 3085, () => {
  console.log(
    `백앤드 서버 ${prod ? process.env.PORT : 3085} 번 포트에서 작동중`
  );
});
