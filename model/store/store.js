const mongoose = require("mongoose");
const { hashString } = require("../../utils/utils");
const { USER_STATUS, USER_TYPE } = require("../../json/enums.json");
const message = require("../../json/messages.json");
mongoose.pluralize(null);

let storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    location: {
      type: { type: String, required: true },
      coordinates: [],
    },
    cretaedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  { autoCreate: true, timestamps: true }
);

storeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("store", storeSchema);
