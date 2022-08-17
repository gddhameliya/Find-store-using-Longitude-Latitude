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
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  handler: async (req, res) => {
    const { email, password } = req.body;

    try {
      const findAdmin = await adminModel.findOne({ email: email });
      if (!findAdmin)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: false,
          message: "user not found...",
        });

      if (findAdmin.role === "admin") {
        let isValid = await compareString(password, findAdmin.password);

        if (isValid) {
          let data4Token = {
            id: findAdmin._id,
            email: findAdmin.email,
            fname: findAdmin.fname,
            lname: findAdmin.lname,
            role: findAdmin.role,
          };

          let token = await generateToken(data4Token, "24h");

          return res.status(HTTP_CODES.OK).send({
            success: true,
            message: message.adminLoginSuccess,
            payload: findAdmin,
            token: token,
          });
        } else {
          return res.status(HTTP_CODES.BAD_REQUEST).send({
            success: false,
            message: message.invalidPassword,
          });
        }
      } else {
        let isValid = await compareString(password, findAdmin.password);

        if (isValid) {
          let data4Token = {
            id: findAdmin._id,
            email: findAdmin.email,
            fname: findAdmin.fname,
            lname: findAdmin.lname,
            role: findAdmin.role,
          };

          let token = await generateToken(data4Token, "1h");

          return res.status(HTTP_CODES.OK).send({
            success: true,
            message: message.userLoginSuccess,
            payload: findAdmin,
            token: token,
          });
        } else {
          return res.status(HTTP_CODES.BAD_REQUEST).send({
            success: false,
            message: message.invalidPassword,
          });
        }
      }
    } catch (error) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        message: message.userRegisterError,
        error: error.message,
      });
    }
  },
};
