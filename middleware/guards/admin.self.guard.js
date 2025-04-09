const ApiError = require("../../helpers/api.error");
const { errorHandler } = require("../../helpers/error_handler");

module.exports = function (req, res, next) {
  try {
    const Id = req.params.id
    const userId = req.user.id; 

    if (Id !== userId) {
      throw ApiError.forbidden(
        "Faqat o'zingizning ma'lumotlaringizga ruxsat bor"
      );
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
