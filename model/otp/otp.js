const { Schema, model } = require("mongoose");

const { USER_TYPE } = require("../../json/enums.json");

let otpSchema = new Schema(
  {
    email: String,
    otp: String,
    role: String,
    isVerify: {
      type: Boolean,
      default: false,
    },
    token: String,
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);

let otpModel = model("otp", otpSchema, "otp");

module.exports = otpModel;
