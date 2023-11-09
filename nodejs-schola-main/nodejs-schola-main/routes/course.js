const express = require("express");

const router = express.Router();

const courseController = require("../controllers/course");

const { authorization } = require("../middleware/check-auth");
const { upload } = require("../middleware/file-upload");

router.get("/", courseController.getCourses);

router.get("/:cid", courseController.getCourseById);

router.get(
  "/me/teacher",
  [authorization],
  courseController.getCoursesByTeacher
);

router.get(
  "/:uid/student",
  [authorization],
  courseController.getCoursesForStudentSubscription
);

router.get(
  "/me/:uid/student",
  [authorization],
  courseController.getCoursesFromStudent
);

router.get(
  "/:cid/students",
  [authorization],
  courseController.getStudentsFromSubscribedCourses
);

router.post(
  "/add",
  [authorization, upload.single("image")],
  courseController.createCourseByTeacher
);

router.post(
  "/add",
  [authorization, upload.single("image")],
  courseController.createCourseByTeacher
);

router.put("/:cid", [authorization], courseController.updateCourseById);

router.put("/:cid/status", [authorization], courseController.disableCourseById);

module.exports = router;
