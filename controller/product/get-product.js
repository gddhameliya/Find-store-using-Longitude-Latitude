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
const { isEmpty } = require("lodash");

module.exports = exports = {
  validation: Joi.object({}),

  handler: async (req, res) => {
    const { id, pname, price, cetagory } = req.query;

    try {
      if (id) {
        let getById = await productModel.findOne({ _id: id });

        if (!getById)
          return res.status(HTTP_CODES.NOT_FOUND).json({
            success: false,
            message: "Product not found",
          });

        return res.status(HTTP_CODES.OK).json({
          success: true,
          message: "Product Found by ID",
          payload: getById,
        });
      } else if (pname) {
        let getByName = await productModel.findOne({ name: pname });
        if (!getByName)
          return res.status(HTTP_CODES.NOT_FOUND).json({
            success: false,
            message: "Product not found",
          });

        return res.status(HTTP_CODES.OK).json({
          success: true,
          message: "Product Found by Product name",
          payload: getByName,
        });
      } else if (price) {
        let getAbovePrice = await productModel.find({ price: { $gte: price } });

        return res.status(HTTP_CODES.OK).json({
          success: true,
          message: "All products are found according to price",
          payload: getAbovePrice,
          count: getAbovePrice.length,
        });
      } else if (cetagory) {
        let getByCetagory = await productModel.find({ cetagory: cetagory });
        if (!getByCetagory)
          return res.status(HTTP_CODES.NOT_FOUND).json({
            success: false,
            message: "Product not found",
          });

        return res.status(HTTP_CODES.OK).json({
          success: true,
          message: "Product Found by cetagory",
          payload: getByCetagory,
        });
      } else {
        let getAllProduct = await productModel.find({}).sort({ createdAt: -1 });
        return res.status(HTTP_CODES.OK).json({
          success: true,
          message: "All products are found",
          payload: getAllProduct,
          count: getAllProduct.length,
        });
      }
    } catch (error) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        error: error.message,
      });
    }
  },
};
