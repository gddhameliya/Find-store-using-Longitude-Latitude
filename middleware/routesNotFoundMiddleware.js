
const { HTTP_CODES } = require("../json/enums.json");

const notFound = (req, res) =>
  res.status(HTTP_CODES.NOT_FOUND).json({
    success: false,
    message: "Routes does not found",
  });

module.exports = notFound;
