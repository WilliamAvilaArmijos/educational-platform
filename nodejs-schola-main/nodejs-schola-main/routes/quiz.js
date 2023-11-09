const express = require("express");

const router = express.Router();

const quizController = require("../controllers/quiz");

const { authorization } = require("../middleware/check-auth");

router.get("/:tid/quiz", quizController.getQuizByThemeId);

router.get(
  "/course/:cid/user/:uid",
  [authorization],
  quizController.getQuizScoreByStudentAndCourse
);

router.get("/:uid", [authorization], quizController.getQuizzesScoreByStudentId);

router.post("/add", [authorization], quizController.createQuizByTeacher);

router.post("/submit", [authorization], quizController.submitQuizByStudent);

module.exports = router;
