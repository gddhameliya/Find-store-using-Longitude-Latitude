const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { USER_TYPE } = require("../json/enums.json");
const messages = require("../json/messages.json");

module.exports = {
  hashString: async (string) => await hash(string, 10),

  compareString: async (string, hash) => await compare(string, hash),

  validateEmptyFields: (payloadData, fields) => {
    let data4message = "please enter ";
    let array4fields = Object.keys(payloadData);
    let invalidFields = new Set();

    fields.forEach((field) => {
      if (!array4fields?.includes(field)) {
        invalidFields.add(field);
      }
    });
    for (const key in payloadData) {
      if (payloadData[key].trim() === "") {
        invalidFields.add(key);
      }
    }
    if (invalidFields.size) {
      const array = Array.from(invalidFields);
      return data4message + array.join(", ");
    } else {
      return null;
    }
  },

  generateToken: (payload, expiry) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiry,
    });
  },

  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  },

  //   createAdmin: async () => {
  //     try {
  //       let roleAdmin = await roleModel.findOne({ role: USER_TYPE.ADMIN });
  //       let roleUser = await roleModel.findOne({ role: USER_TYPE.USER });
  //       let admin = await adminModel.findOne({ email: process.env.ADMIN_EMAIL });

  //       if (!roleUser) {
  //         await roleModel.create({ role: USER_TYPE.USER });
  //       }
  //       if (!roleAdmin) {
  //         let newRole = await roleModel.create({ role: USER_TYPE.ADMIN });
  //         if (!admin) {
  //           await adminModel.create({
  //             email: process.env.ADMIN_EMAIL,
  //             password: await hash(process.env.ADMIN_PASSWORD, 10),
  //             role: newRole._id,
  //           });
  //         }
  //       }
  //       if (!admin) {
  //         await adminModel.create({
  //           email: process.env.ADMIN_EMAIL,
  //           password: await hash(process.env.ADMIN_PASSWORD, 10),
  //           role: roleAdmin._id,
  //         });
  //       }
  //     } catch (error) {
  //       console.log("admin create error", error);
  //     }
  //   },
};
