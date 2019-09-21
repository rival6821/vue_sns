const express = require("express");
const multer = require("multer");
const db = require("../models");
const path = require("path");

const { isLoggedIn } = require("./middlewares");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); //확장자
      const basename = path.basename(file.originalname, ext); //파일명
      done(null, basename + Date.now() + ext);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }
});

// 이미지 등록
router.post("/images", isLoggedIn, upload.array("image"), (req, res) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});

// 게시글 등록
router.post("/", isLoggedIn, (req, res) => {});

module.exports = router;
