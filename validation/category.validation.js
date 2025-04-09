const Joi = require("joi");

exports.categoryValidation = (body) => {
  const Schamecategory = Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .message("Categoryda eng kami 2 ta belgi !")
      .max(30)
      .message("Category 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "Category Bo'sh bo'lishi mummkin emas",
        "any.required": "Category Bo'sh",
      }),
    about: Joi.string()
      .required()
      .min(10)
      .message("Categoryda malumot eng kami 10 ta belgi !")
      .max(300)
      .message("Categoryda malumot 300 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "Categoryda malumot Bo'sh bo'lishi mummkin emas",
        "any.required": "Categoryda malumot Bo'sh",
      }),
  });
  return Schamecategory.validate(body, {
    abortEarly: false,
  });
};
