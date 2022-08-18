const Joi = require("joi");

const subscriptionModel = require("../../model/subscription/subscription");
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
  handler: async (req, res) => {
    const { id, nam } = req.query;

    try {
      if (id) {
        let getById = await subscriptionModel
          .findOne({ _id: id })
          .populate("createdBy");

        if (!getById)
          return res.status(HTTP_CODES.NOT_FOUND).json({
            success: false,
            message: "Subscription not found",
          });

        return res.status(HTTP_CODES.OK).json({
          success: true,
          message: "Subscription Found by ID",
          payload: getById,
        });
      } else if (name) {
        let getByName = await subscriptionModel
          .find({ name: name })
          .populate("createdBy");
        if (!getByName)
          return res.status(HTTP_CODES.NOT_FOUND).json({
            success: false,
            message: "Subscription not found",
          });

        return res.status(HTTP_CODES.OK).json({
          success: true,
          message: "Subscription Found by name",
          payload: getByName,
        });
      } else {
        let getAllProduct = await subscriptionModel
          .find({})
          .sort({ createdAt: -1 })
          .populate("createdBy");
        return res.status(HTTP_CODES.OK).json({
          success: true,
          message: "All Subscription are found",
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
