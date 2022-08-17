const express = require("express");
const router = express.Router();
const storeApi = require("../../controller/store/index");
const { auth } = require("../../middleware/auth");
const validate = require("../../middleware/validate");

router.post(
  "/add-store",
  auth,
  validate("body", storeApi.addStore.validation),
  storeApi.addStore.handler
);

router.get("/get-all-store", storeApi.getAllStore.handler);

router.get("/get-nearby-store", auth, storeApi.getNearByStore.handler);

// router.put(
//   "/update-product/:id",
//   auth,
//   validate("body", storeApi.updateProduct.validation),
//   storeApi.updateProduct.handler
// );

// router.delete("/delete-product", auth, storeApi.deleteProduct.handler);

module.exports = exports = router;
