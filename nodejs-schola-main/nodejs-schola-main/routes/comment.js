const express = require("express");

const router = express.Router();

const commentController = require("../controllers/comment");

const { authorization } = require("../middleware/check-auth");

router.get(
  "/section/:sid",
  [authorization],
  commentController.getCommentsBySectionId
);

router.post("/add", [authorization], commentController.createComment);

module.exports = router;
