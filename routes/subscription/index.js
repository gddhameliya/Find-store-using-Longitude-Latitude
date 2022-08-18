const express = require("express");
const router = express.Router();
const subscriptionApi = require("../../controller/subscription/index");
const { auth, authAdmin } = require("../../middleware/auth");
const validate = require("../../middleware/validate");

router.post(
  "/create-subscription",
  authAdmin,
  validate("body", subscriptionApi.createSubscription.validation),
  subscriptionApi.createSubscription.handler
);

// router.get("/get-subscription", subscriptionApi.getsubscription.handler);

// router.put(
//   "/update-subscription/:id",
//   authAdmin,
//   validate("body", subscriptionApi.updatesubscription.validation),
//   subscriptionApi.updatesubscription.handler
// );

// router.delete("/delete-subscription", authAdmin, subscriptionApi.deletesubscription.handler);

module.exports = exports = router;
