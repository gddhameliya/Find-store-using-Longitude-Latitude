const Joi = require("joi");

const storeModel = require("../../model/store/store");
const message = require("../../json/messages.json");
const { HTTP_CODES, USER_TYPE, USER_STATUS } = require("../../json/enums.json");

module.exports = exports = {
  validation: Joi.object({}),

  handler: async (req, res) => {
    try {
      let { city, storeID, pincode } = req.query;

      let criteria = {};

      if (city) {
        criteria = {
          city: city,
        };
      } else if (storeID) {
        criteria = {
          _id: storeID,
        };
      } else if (pincode) {
        criteria = {
          pincode: pincode,
        };
      } else {
        criteria = {};
      }
      let stores = await storeModel.find(criteria);
      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: "store found",
        payload: stores,
        count: stores.length,
      });
    } catch (error) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        error: error.message,
      });
    }
  },
};
