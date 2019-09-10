const passport = require("passport");
const db = require("../models");
const bcrypt = require("bcrypt");
const { Strategy: LocalStortage } = require("passport-local");

module.exports = () => {
  passport.use(
    new LocalStortage(
      {
        usernameField: "email", //req.body.email
        passwordField: "password" //req.body.password
      },
      async (email, password, done) => {
        try {
          const exUser = await db.User.findOne({
            where: {
              email
            }
          });
          if (!exUser) {
            return done(null, false, {
              reason: "존재하지 않는 사용자 입니다."
            });
          }
          const result = await bcrypt.compare(password, exUser.password);
          if (result) {
            return done(null, exUser);
          } else {
            return done(null, false, {
              reason: "비밀번호가 일치하지 않습니다."
            });
          }
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
