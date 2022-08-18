const mongoose = require("mongoose");
const { hashString } = require("../../utils/utils");
const { USER_STATUS, USER_TYPE } = require("../../json/enums.json");
const message = require("../../json/messages.json");
mongoose.pluralize(null);

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    isActive: { type: Boolean, default: true },
  },
  { autoCreate: true, timestamps: true }
);

module.exports = exports = mongoose.model("subscription", subscriptionSchema);
