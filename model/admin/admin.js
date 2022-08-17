const mongoose = require("mongoose");
const { hashString } = require("../../utils/utils");
const { USER_STATUS, USER_TYPE } = require("../../json/enums.json");
const message = require("../../json/messages.json");
mongoose.pluralize(null);

let adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [USER_STATUS.ACTIVE, USER_STATUS.PENDING, USER_STATUS.BLOCKED],
      default: USER_STATUS.ACTIVE,
    },
    role: {
      type: String,
      enum: [USER_TYPE.ADMIN, USER_TYPE.USER],
      default: USER_TYPE.USER,
    },
  },
  { timestamps: true, versionKey: false, autoCreate: true }
);

adminSchema.pre("save", async function (next) {
  try {
    const admin = this;
    if (admin.isModified("password") || admin.isNew) {
      this.password = await hashString(admin.password);
      next();
    } else {
      next();
    }
  } catch (error) {
    console.log(message.passwordEncryptError, error);
  }
});

adminSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["password"];
    return ret;
  },
});

module.exports = mongoose.model("admin", adminSchema);
