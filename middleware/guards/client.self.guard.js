
const ApiError = require("../../helpers/api.error");

module.exports = function (Model, idField = "id") {
  return async (req, res, next) => {
    try {
      const Id = req.params[idField];
      console.log(Id);
      
      const record = await Model.findByPk(Id);
      console.log(record);
      
      if (!record) {
        throw ApiError.notFound("Client ma'lumot topilmadi");
      }

      if (record.id !== req.user.id && record.userId !== req.user.id) {
        throw ApiError.forbidden("Kirmisan client.self");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
