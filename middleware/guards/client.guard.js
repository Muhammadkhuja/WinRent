const ApiError = require("../../helpers/api.error");

module.exports = function (req, res, next) {
  try {
    if (req.user?.role !== "client") {
      throw ApiError.forbidden("Siz kimsiz nima kimligizni bilmi qoldizmi ?");
    }
    next();
  } catch (error) {
    next(error);
  }
};
