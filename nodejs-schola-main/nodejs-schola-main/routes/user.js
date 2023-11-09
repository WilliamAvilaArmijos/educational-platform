const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

const { authorization } = require("../middleware/check-auth");
const { upload } = require("../middleware/file-upload");

router.get("/students", [authorization], userController.getStudentsByAdmin);

router.get("/teachers", [authorization], userController.getTeachersByAdmin);

router.get(
  "/:uid/student",
  [authorization],
  userController.getStudentByIdByAdmin
);

router.get(
  "/:uid/teacher",
  [authorization],
  userController.getTeacherByIdByAdmin
);

router.get("/resume", [authorization], userController.countUsersByRoleByAdmin);

router.post("/register", [upload.single("image")], userController.createUser);

router.post("/login", userController.loginUser);

router.put(
  "/:uid/update",
  [authorization, [upload.single("image")]],
  userController.updateUser
);

module.exports = router;
