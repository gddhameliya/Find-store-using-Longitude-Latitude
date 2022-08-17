const Joi = require("joi");

const adminModel = require("../../model/admin/admin");
const message = require("../../json/messages.json");
const { HTTP_CODES, USER_TYPE, USER_STATUS } = require("../../json/enums.json");

const {
  validateEmptyFields,
  generateToken,
  verifyToken,
  hashString,
  compareString,
} = require("../../utils/utils");

module.exports = exports = {

  // router validation
  validation: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fname: Joi.string().required(),
    lname: Joi.string().required(),
  }),

  handler: async (req, res) => {
    try {
      const { email, password, fname, lname } = req.body;

      const findAdmin = await adminModel.findOne({ email: email });
      if (findAdmin) {
        return res
          .status(HTTP_CODES.DUPLICATE_VALUE)
          .json({ success: false, error: "email is already register" });
      } else {
        const registerAdmin = await adminModel.create(req.body);

        let payload = {
          _id: registerAdmin._id,
          email: registerAdmin.email,
          fname: registerAdmin.fname,
          lname: registerAdmin.lname,
          role: registerAdmin.role,
        };

        let token = generateToken(payload, "24h");

        return res.status(HTTP_CODES.OK).json({
          success: true,
          message: "User Created",
          payload: payload,
          token: token,
        });
      }
    } catch (error) {
      res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        message: message.userRegisterError,
        error: error.message,
      });
    }
  },
};
