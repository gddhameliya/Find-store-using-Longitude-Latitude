const Joi = require("joi");

const SubscriptionModel = require("../../model/subscription/subscription");
const message = require("../../json/messages.json");
const { HTTP_CODES, USER_TYPE, USER_STATUS } = require("../../json/enums.json");

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
      let admin = req.admin;

      let { name, price, duration } = req.body;

      if (price == 0)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          message: "Invalid price",
        });

      let payload = {
        ...req.body,
        updatedBy: admin._id,
      };

      const updateSubscription = await SubscriptionModel.updateOne(payload);

      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: "Subscription Created successfully",
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
