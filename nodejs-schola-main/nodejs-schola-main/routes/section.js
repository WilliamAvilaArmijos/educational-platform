const express = require("express");

const router = express.Router();

const sectionController = require("../controllers/section");

const { authorization } = require("../middleware/check-auth");
const { upload } = require("../middleware/file-upload");

router.get("/:sid", sectionController.getSectionById);

router.get(
  "/me/:tid/teacher",
  [authorization],
  sectionController.getSectionsByThemeIdByTeacher
);

router.post(
  "/add/:tid",
  [authorization, upload.single("video")],
  sectionController.createSectionByThemeId
);

module.exports = router;
