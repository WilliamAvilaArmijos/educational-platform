const express = require("express");

const router = express.Router();

const examController = require("../controllers/exam");

const { authorization } = require("../middleware/check-auth");

router.get("/:cid/exam", examController.getExamByCourseId);

router.get(
  "/course/:cid/user/:uid",
  [authorization],
  examController.getExamsScoreByStudentAndCourse
);

router.post("/add", [authorization], examController.createExamByTeacher);

router.post("/submit", [authorization], examController.submitExamByStudent);

module.exports = router;
