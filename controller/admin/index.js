const registerAdmin = require("./admin-register");
const adminLogin = require("./admin-login");
const forgotPassword = require("./forgot-password");
const verifyOtp = require("./verify-otp");
const changePassword = require("./change-password");
const resetPassword = require("./reset-password");

module.exports = exports = {
  registerAdmin,
  adminLogin,
  forgotPassword,
  verifyOtp,
  changePassword,
  resetPassword,
};
