const express = require("express");

const router = express.Router();

const subscriptionController = require("../controllers/subscription");

const { authorization } = require("../middleware/check-auth");

router.post(
  "/add",
  [authorization],
  subscriptionController.createSubscriptionByAdmin
);

module.exports = router;
