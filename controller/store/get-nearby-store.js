const Joi = require("joi");

const storeModel = require("../../model/store/store");
const message = require("../../json/messages.json");
const { HTTP_CODES, USER_TYPE, USER_STATUS } = require("../../json/enums.json");

module.exports = exports = {
  validation: Joi.object({}),

  handler: async (req, res) => {
    try {
      let user = req.user;

      let { longitude, latitude } = req.query;

      // const storeData = await storeModel
      //   .aggregate([
      //     {
      //       $geoNear: {
      //         near: {
      //           type: "Point",
      //           coordinates: [parseFloat(longitude), parseFloat(latitude)],
      //         },
      //         key: "location",
      //         maxDistance: parseFloat(1000) * 1000,
      //         spherical: true,
      //         distanceField: "calculated",
      //       },
      //     },
      //   ])
      //   .sort({ calculated: 1 });

      // let payload = [];

      // for (let i = 0; i < storeData.length; i++) {
      //   let distance = Math.round(storeData[i].calculated / 1000);
      //   let store = {
      //     ...storeData[i],
      //     distance,
      //   };
      //   payload.push(store);
      // }

      // return res.status(HTTP_CODES.OK).json({
      //   success: true,
      //   message: "store Created successfully",
      //   payload: payload,
      //   count: payload.length,
      // });

      let getNearByStore = await storeModel.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            $maxDistance: parseFloat(1000) * 1000,
          },
        },
      });
      return res.status(HTTP_CODES.OK).json({
        success: true,
        payload: getNearByStore,
        count: getNearByStore.length,
      });
    } catch (error) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        success: false,
        error: error.message,
      });
    }
  },
};
