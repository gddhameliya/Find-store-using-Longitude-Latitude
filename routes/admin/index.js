const express = require("express");
const router = express.Router();
const adminApi = require("../../controller/admin");
const { auth } = require("../../middleware/auth");
const validate = require("../../middleware/validate");

router.post(
  "/admin-register",
  validate("body", adminApi.registerAdmin.validation),
  adminApi.registerAdmin.handler
);

router.post(
  "/admin-login",
  validate("body", adminApi.adminLogin.validation),
  adminApi.adminLogin.handler
);

router.post(
  "/forgot-password",
  validate("body", adminApi.forgotPassword.validation),
  adminApi.forgotPassword.handler
);

router.post(
  "/verify-otp",
  validate("body", adminApi.verifyOtp.validation),
  adminApi.verifyOtp.handler
);

router.post(
  "/change-password",
  validate("body", adminApi.changePassword.validation),
  adminApi.changePassword.handler
);

router.post(
  "/reset-password",
  auth,
  validate("body", adminApi.resetPassword.validation),
  adminApi.resetPassword.handler
);

module.exports = exports = router;
