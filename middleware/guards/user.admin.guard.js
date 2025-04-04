const ApiError = require("../../helpers/api.error");

module.exports = function (req, res, next) {
  if (req.user.is_creator) {
    throw ApiError.forbidden("Kirmisan");
  }
  next();
};
