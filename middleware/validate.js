/**
 * Created by Bhargav Butani on 07.07.2021.
 */
const { get, isEmpty } = require("lodash");

const enums = require("../json/enums.json");
const { HTTP_CODES, USER_TYPE, USER_STATUS } = require("../json/enums.json");

module.exports = exports = (path, schema) => async (req, res, next) => {
  if (!["body", "query", "params"].includes(path)) {
    console.log(
      `#validation - checking only body, query or params, but got: ${path}`
    );
    return next();
  }
  const dataForValidation = get(req, path, null);
  const { value, error } = schema.validate(dataForValidation, {
    allowUnknown: false,
    stripUnknown: true,
  });
  if (error) {
    const context = get(error, "details[0].context.message", null);
    console.log(
      `#validation - Error encountered at path: "${
        req.path
      }", data: ${JSON.stringify(
        dataForValidation
      )}, context: ${context}\n${error}`
    );

    res.status(HTTP_CODES.BAD_REQUEST).json({
      success: false,
      message: String(error),
      payload: context ? { context } : {},
    });
  } else {
    // Overriding sanitized object
    req[path] = value;
    next();
  }
};
