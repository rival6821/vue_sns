const express = require("express");
const db = require("../models");

const { isLoggedIn } = require("./middlewares");

const router = express.Router();

// 게시글 등록
router.post("/", isLoggedIn, (req, res) => {});

// 이미지 등록
router.post("/images", isLoggedIn, (req, res) => {});

module.exports = router;
