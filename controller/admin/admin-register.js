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
    role: Joi.string(),
  }),

  handler: async (req, res) => {
    try {
      const { email, password, fname, lname, role } = req.body;
      console.log("req.body", req.body);

      const findAdmin = await adminModel.findOne({ email: email });
      if (findAdmin) {
        return res
          .status(HTTP_CODES.DUPLICATE_VALUE)
          .json({ success: false, error: "email is already register" });
      }
      let payload = {};

      if (req.body.role == "admin") {
        payload = {
          email,
          password,
          fname,
          lname,
          role: USER_TYPE.ADMIN,
        };
      } else {
        payload = {
          email,
          password,
          fname,
          lname,
          role: USER_TYPE.USER,
        };
      }

      console.log("payload", payload);
      const registerAdmin = await adminModel.create(payload);
      // delete registerAdmin._doc.password;
      let token = generateToken(registerAdmin._doc, process.env.JWT_EXPIRY);

      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: "User Created",
        payload: registerAdmin,
        token: token,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        message: message.userRegisterError,
        error: error.message,
      });
    }
  },
};
