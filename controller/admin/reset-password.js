const { HTTP_CODES, USER_TYPE, USER_STATUS } = require("../../json/enums.json");
const message = require("../../json/messages.json");
const Joi = require("joi");
const {
  validateEmptyFields,
  generateToken,
  compareString,
} = require("../../utils/utils");

const adminModel = require("../../model/admin/admin");

module.exports = exports = {
  // router validation
  validation: Joi.object({
    newPassword: Joi.string().required(),
    password: Joi.string().required(),
  }),

  handler: async (req, res) => {
    try {
      let user = req.user;
      const { password, newPassword } = req.body;

      let findUser = await adminModel.findOne({ _id: user._id });
      if (!findUser)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: false,
          message: message.userNotFound,
        });

      if (password === newPassword)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: true,
          message: "both password are same",
        });

      const validPassword = await compareString(password, findUser.password);
      if (!validPassword)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: true,
          message: "password does not match",
        });

      findUser.password = newPassword;
      await findUser.save();

      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: message.passwordUpdateSuccess,
      });
    } catch (error) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        message: message.passwordUpdateError,
        error: error.message,
      });
    }
  },
};
