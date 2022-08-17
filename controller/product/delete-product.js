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
  //   validation: Joi.object({
  //   }),

  handler: async (req, res) => {
    try {
      let user = req.user;

      let { id } = req.query;

      if (!id)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: false,
          message: "Invalid id",
        });

      let findProduct = await productModel.findOne({ _id: id });
      if (!findProduct)
        return res.status(HTTP_CODES.NOT_FOUND).json({
          success: false,
          message: "Product not found",
        });

      let deleteProduct = await productModel.deleteOne({ _id: id });

      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        error: error.message,
      });
    }
  },
};
