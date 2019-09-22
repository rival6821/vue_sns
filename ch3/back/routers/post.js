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
router.post("/", isLoggedIn, async (req, res) => {
  try {
    // req.body.content,
    // req.body.imagePaths,
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    if (hashtags) {
      const result = Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() }
          })
        )
      );
      await newPost.addHashtags(result(map(r => r[0])));
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    return res.json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
