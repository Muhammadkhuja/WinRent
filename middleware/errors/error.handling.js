// const ApiError = require("../../helpers/api.error");
// const logger = require("../../services/logger.service");

// module.exports = function (err, req, res, next) {
//   logger.error(err);
//   if (err instanceof ApiError) {
//     return res.status(err.status).json(err.toJson());
//   }

//   if (err instanceof SyntaxError) {
//     return res.status(err.status).json({ message: err.message });
//   }

//   return res.status(500).json(ApiError.internal("ko'dga qara nima yozib tashadin"));
// };


const ApiError = require("../../helpers/api.error");
const logger = require("../../services/logger.service");

module.exports = function (err, req, res, next) {
  // Xato haqida log yozish
  logger.error(err);

  // Agar javob yuborilgan bo'lsa, xatoni keyingi handlerga uzatish
  if (res.headersSent) {
    return next(err);
  }

  // ApiError xatolari uchun javob yuborish
  if (err instanceof ApiError) {
    return res.status(err.status).json(err.toJson());
  }

  // SyntaxError xatolari uchun javob yuborish
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: err.message }); // 400 - bad request
  }

  // Umumiy server xatosi (500) uchun javob yuborish
  return res
    .status(500)
    .json(ApiError.internal("Xatolik yuz berdi, iltimos qayta urinib ko'ring"));
};
