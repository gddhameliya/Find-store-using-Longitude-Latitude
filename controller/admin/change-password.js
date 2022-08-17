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
    password: Joi.string().required(),
  }),

  handler: async (req, res) => {
    try {
      const { password } = req.body;
      let passwordToken = req.headers["x-otp-token"];

      if (!passwordToken)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: false,
          message: "Token not found",
        });

      let otpData = verifyToken(passwordToken);

      let findOtp = await otpModel.findOne({ email: otpData.email });
      if (!findOtp)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: true,
          message: "You are not verified user",
        });
        
      let adminFind = await adminModel.findOne({ email: findOtp.email });

      if (findOtp.isVerify !== true) {
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: false,
          message: message.passwordUpdateError,
        });
      }

      adminFind.password = password;
      await adminFind.save();
      await findOtp.remove();

      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: message.passwordUpdateSuccess,
      });
    } catch (error) {
      console.log("error in forgot password", error);
      res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        message: message.passwordUpdateError,
        error: error.message,
      });
    }
  },
};
