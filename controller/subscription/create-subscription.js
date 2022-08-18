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
  // router validation
  validation: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    duration: Joi.number().required(),
  }),

  handler: async (req, res) => {
    try {
      let admin = req.admin;
      console.log("admin", admin);

      let { name, duration, price } = req.body;

      if (price == 0)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          message: "Invalid price",
        });

      let findSubscription = await subscriptionModel.find({});
      console.log("findSubscription", findSubscription);
      for (let i = 0; i < findSubscription.length; i++) {
        if (findSubscription[i].name == name) {
          return res.status(HTTP_CODES.BAD_REQUEST).json({
            message: "Subscription already exists",
          });
        }
      }

      let payload = {
        ...req.body,
        createdBy: req.admin._id,
      };

      console.log("payload", payload);

      const createSubscription = await subscriptionModel.create(payload);

      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: "product Created successfully",
        payload: createSubscription,
      });
    } catch (error) {
      console.log(">>>>>>>>>>>>>>>>>>>", error);
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        error: error.message,
      });
    }
  },
};
