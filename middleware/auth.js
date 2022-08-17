const adminModel = require("../model/admin/admin");
const { verifyToken } = require("../utils/utils");

const { HTTP_CODES } = require("../json/enums.json");
const message = require("../json/messages.json");

module.exports = {
  authUser: async (req, res, next) => {
    try {
      let token = req.headers["x-auth-token"];

      let userId = verifyToken(token).id;

      let user = await adminModel.findById(userId);

      if (user) {
        if (user.role == "user") {
          req.user = user;
          next();
        } else {
          res.status(HTTP_CODES.UNAUTHORIZED).send({
            status: false,
            message: message.userBlocked,
          });
        }
      } else {
        res.status(HTTP_CODES.UNAUTHORIZED).send({
          status: false,
          message: message.userNotFound,
        });
      }
    } catch (error) {
      console.log("admin auth error", { err: error.message });
      switch (error.message) {
        case "jwt expired":
          res.status(HTTP_CODES.UNAUTHORIZED).send({
            status: false,
            message: message.tokenExpired,
          });
          break;

        case "jwt must be provided":
          res.status(HTTP_CODES.UNAUTHORIZED).send({
            status: false,
            message: message.tokenNotProvided,
          });
          break;

        default:
          res.status(HTTP_CODES.UNAUTHORIZED).send({
            status: false,
            message: message.unauthorizedError,
            error: error.message,
          });
          break;
      }
    }
  },

  authAdmin: async (req, res, next) => {
    try {
      let token = req.headers["x-auth-token"];

      let adminId = verifyToken(token).id;

      let admin = await adminModel.findById(adminId);

      if (admin.role == "admin") {
        req.admin = admin;
        next();
      } else {
        res.status(HTTP_CODES.BAD_REQUEST).send({
          status: false,
          message: message.adminNotRegister,
        });
      }
    } catch (error) {
      console.log("admin auth error", { err: error.message });
      switch (error.message) {
        case "jwt expired":
          res.status(HTTP_CODES.UNAUTHORIZED).send({
            status: false,
            message: message.tokenExpired,
          });
          break;

        default:
          res.status(HTTP_CODES.UNAUTHORIZED).send({
            status: false,
            message: message.unauthorizedError,
            error: error.message,
          });
          break;
      }
    }
  },

  auth: async (req, res, next) => {
    try {
      let token = req.headers["x-auth-token"];

      let userID = verifyToken(token).id;

      let user = await adminModel.findById(userID);

      if (user.role == "admin") {
        req.user = user;
        next();
      } else if (user.role == "user") {
        if (user.status === "active") {
          req.user = user;
          next();
        } else {
          res.status(HTTP_CODES.UNAUTHORIZED).send({
            status: false,
            message: message.userBlocked,
          });
        }
      } else {
        res.status(HTTP_CODES.UNAUTHORIZED).send({
          status: false,
          message: message.userNotFound,
        });
      }
    } catch (error) {
      console.log("admin auth error", { err: error.message });
      switch (error.message) {
        case "jwt expired":
          res.status(HTTP_CODES.UNAUTHORIZED).send({
            status: false,
            message: message.tokenExpired,
          });
          break;

        default:
          res.status(HTTP_CODES.UNAUTHORIZED).send({
            status: false,
            message: message.unauthorizedError,
            error: error.message,
          });
          break;
      }
    }
  },
};
