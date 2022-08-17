const Joi = require("joi");

const productModel = require("../../model/store/store");
const message = require("../../json/messages.json");
const { HTTP_CODES, USER_TYPE, USER_STATUS } = require("../../json/enums.json");

const {} = require("../../utils/utils");

module.exports = exports = {
  // router validation
  validation: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    city: Joi.string().required(),
    phone: Joi.string().min(10).max(13).required(),
    pincode: Joi.number().required(),
  }),

  handler: async (req, res) => {
    try {
      let user = req.user;

      let { longitude, latitude } = req.query;

      console.log("req.body", req.body);

      if (longitude == 0 || latitude == 0)
        return res.status(HTTP_CODES.BAD_REQUEST).json({
          success: false,
          message: "Invalid longitude and letitude",
        });

      let payload = {
        ...req.body,
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        createdBy: user._id,
      };

      const createStore = await productModel.create(payload);
      return res.status(HTTP_CODES.OK).json({
        success: true,
        message: "store Created successfully",
        payload,
      });
    } catch (error) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        error: error.message,
      });
    }
  },
};
