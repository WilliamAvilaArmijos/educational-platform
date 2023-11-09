const express = require("express");

const router = express.Router();

const themeController = require("../controllers/theme");

const { authorization } = require("../middleware/check-auth");

router.get("/:tid", themeController.getThemeById);

router.get(
  "/me/:cid/teacher",
  [authorization],
  themeController.getThemesByCourseIdByTeacher
);

router.post(
  "/add/:cid",
  [authorization],
  themeController.createThemeByCourseId
);

module.exports = router;
