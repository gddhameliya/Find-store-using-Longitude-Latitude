const Joi = require("joi");

const subscriptionModel = require("../../model/subscription/subscription");
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
  handler: async (req, res) => {
    try {
      let user = req.user;

      let { sid } = req.query;

      if (!sid)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          message: "Invalid request",
        });

      let findAdmin = await adminModel.findById(user._id);
      let findSubscription = await subscriptionModel.findById(sid);
      if (!findAdmin || !findSubscription)
        return res.status(HTTP_CODES.NOT_FOUND).json({
          success: false,
          message: "not found",
        });

      const date = new Date();
      let startDate = date.toJSON().slice(0, 10);

      let endDate = new Date(
        date.setMonth(date.getMonth() + findSubscription.duration)
      );

      endDate = endDate.toJSON().slice(0, 10);
      console.log("end", endDate);

      let setAdmin = await adminModel.findByIdAndUpdate(user._id, {
        $set: {
          subscription: findSubscription._id,
          subscriptionStartDate: startDate,
          subscriptionEndDate: endDate,
          isSubscribed: true,
        },
      });

      if (!setAdmin)
        return res.status(HTTP_CODES.NOT_FOUND).json({
          success: false,
          message: "not found",
        });
      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: "subscription purchased",
      });
    } catch (error) {
      console.log("error", error);
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        error: error.message,
      });
    }
  },
};
