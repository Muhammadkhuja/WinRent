const ApiError = require("../../helpers/api.error");

module.exports = function (Model, idField = "id") {
  return async (req, res, next) => {
    try {
      const Id = req.params[idField];
      const record = await Model.findByPk(Id);

      if (!record) {
        throw ApiError.notFound("Ma'lumot topilmadi");
      }

      if (record.id !== req.user.id && record.owner_id !== req.user.id) {
        throw ApiError.forbidden("Kirmisan !");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
