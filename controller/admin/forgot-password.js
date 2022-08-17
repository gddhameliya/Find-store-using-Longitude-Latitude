const { HTTP_CODES, USER_TYPE, USER_STATUS } = require("../../json/enums.json");
const message = require("../../json/messages.json");
const Joi = require("joi");
const {
  validateEmptyFields,
  generateToken,
  compareString,
} = require("../../utils/utils");

const adminModel = require("../../model/admin/admin");
const otpModel = require("../../model/otp/otp");

const { sendEmail } = require("../../services/mail.service");

module.exports = exports = {
  // router validation
  validation: Joi.object({
    email: Joi.string().email().required(),
  }),

  handler: async (req, res) => {
    try {
      let { email } = req.body;

      let admin = await adminModel.findOne({ email });
      if (admin) {
        let otp = await sendEmail(admin.email);

        //   let hashedOtp = await hashString(otp.toString());

        await otpModel.findOneAndUpdate(
          {
            email: req.body.email,
          },
          {
            otp: otp,
            role: admin.role,
          },
          {
            upsert: true,
          }
        );

        res.status(HTTP_CODES.OK).json({
          status: true,
          message: message.otpSendSuccess,
          token: generateToken(
            {
              otp: otp,
              id: admin._id,
              fname: admin.fname,
              type: "forgot",
              isVerify: false,
              email: admin.email,
              role: admin.role,
            },
            "24h"
          ),
        });
      } else {
        res.status(HTTP_CODES.BAD_REQUEST).send({
          success: false,
          message: message.userNotFound,
        });
      }
    } catch (error) {
      console.log("error in forgot password", error);
      res.status(HTTP_CODES.BAD_REQUEST).send({
        success: false,
        message: message.forgotPasswordError,
        error: error.message,
      });
    }
  },
};
