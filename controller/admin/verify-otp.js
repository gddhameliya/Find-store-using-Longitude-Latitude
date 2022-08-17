const { HTTP_CODES, USER_TYPE, USER_STATUS } = require("../../json/enums.json");
const message = require("../../json/messages.json");
const Joi = require("joi");
const {
  validateEmptyFields,
  generateToken,
  compareString,
  verifyToken,
} = require("../../utils/utils");

const adminModel = require("../../model/admin/admin");
const otpModel = require("../../model/otp/otp");

module.exports = exports = {
  // router validation
  validation: Joi.object({
    otp: Joi.string().length(6).required(),
  }),

  handler: async (req, res) => {
    try {
      const { otp } = req.body;
      let otpToken = req.headers["x-otp-token"];
      if (!otpToken)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: false,
          message: "Token not found",
        });
      let otpData = verifyToken(otpToken);

      let findOtp = await otpModel.findOne({ email: otpData.email });
      if (!findOtp)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: false,
          message: message.otpVerifyError,
        });

      if (otp == otpData.otp && otp == findOtp.otp) {
        let verifiedOtp = await otpModel.findOneAndUpdate(
          { email: otpData.email },
          { $set: { isVerify: true } },
          { new: true }
        );

        let data4Token = {
          id: otpData.id,
          email: verifiedOtp.email,
          isVerify: verifiedOtp.isVerify,
        };

        let token = await generateToken(data4Token, "24h");

        return res.status(HTTP_CODES.OK).json({
          success: true,
          message: message.otpVerifiedSuccess,
          token: token,
        });
      } else {
        res.status(HTTP_CODES.BAD_REQUEST).send({
          success: false,
          message: message.invalidOtp,
        });
      }
    } catch (error) {
      console.log("error in forgot password", error);
      res.status(HTTP_CODES.BAD_REQUEST).send({
        success: false,
        message: message.otpVerifyError,
        error: error.message,
      });
    }
  },
};
