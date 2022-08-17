const express = require("express");
const router = express.Router();
const productApi = require("../../controller/product/");
const { auth } = require("../../middleware/auth");
const validate = require("../../middleware/validate");

router.post(
  "/create-product",
  auth,
  validate("body", productApi.createPoduct.validation),
  productApi.createPoduct.handler
);

router.get("/get-product", productApi.getProduct.handler);

router.put(
  "/update-product/:id",
  auth,
  validate("body", productApi.updateProduct.validation),
  productApi.updateProduct.handler
);

router.delete("/delete-product", auth, productApi.deleteProduct.handler);

module.exports = exports = router;
