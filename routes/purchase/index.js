const express = require("express");
const router = express.Router();
const purchaseApi = require("../../controller/purchase/index");
const { auth } = require("../../middleware/auth");
const validate = require("../../middleware/validate");

router.post("/create-purchase", auth, purchaseApi.createPurchase.handler);

// router.get("/get-purchase", purchaseApi.getPurchase.handler);

// router.delete("/delete-purchase", auth, purchaseApi.deletePurchase.handler);

module.exports = exports = router;
