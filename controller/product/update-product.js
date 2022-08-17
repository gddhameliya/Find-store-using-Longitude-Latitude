const Joi = require("joi");

const productModel = require("../../model/product/product");
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
    name: Joi.string().required(),
    description: Joi.string().required(),
    cetagory: Joi.string().required(),
    price: Joi.number().required(),
  }),

  handler: async (req, res) => {
    try {
      let user = req.user;

      let { name, description, cetagory, price } = req.body;

      if (price == 0)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          message: "Invalid price",
        });

      let payload = {
        ...req.body,
        updatedBy: user._id,
      };

      const updateProduct = await productModel.updateOne(payload);

      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: "product Created successfully",
        data: payload,
      });
    } catch (error) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        error: error.message,
      });
    }
  },
};
