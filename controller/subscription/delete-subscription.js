const Joi = require("joi");

const SubscriptionModel = require("../../model/subscription/subscription");
const message = require("../../json/messages.json");
const { HTTP_CODES } = require("../../json/enums.json");

module.exports = exports = {
  handler: async (req, res) => {
    try {
      let admin = req.admin;

      let { id } = req.query;

      if (!id)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: false,
          message: "Invalid id",
        });

      let findSubscription = await SubscriptionModel.findOne({ _id: id });
      if (!findSubscription)
        return res.status(HTTP_CODES.NOT_FOUND).json({
          success: false,
          message: "Subscription not found",
        });

      let deleteSubscription = await SubscriptionModel.deleteOne({ _id: id });

      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: "Subscription deleted successfully",
      });
    } catch (error) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        error: error.message,
      });
    }
  },
};
