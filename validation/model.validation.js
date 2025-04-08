const Joi = require("joi");

exports.modelValidation = (body) => {
  const Schamemodel = Joi.object({
    categoryId: Joi.number().required().messages({
      "string.empty": "Bo'sh bo'lishi mummkin emas",
      "any.required": "Bo'sh",
    }),
    name: Joi.string()
      .required()
      .min(4)
      .message("eng kami 4 ta belgi !")
      .max(30)
      .message("ism 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "So'z bo'sh bo'lishi mummkin emas",
        "any.required": "So'z kiriting",
      }),
    brand: Joi.string()
      .required()
      .min(4)
      .message("eng kami 4 ta belgi !")
      .max(30)
      .message("ism 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "So'z bo'sh bo'lishi mummkin emas",
        "any.required": "So'z kiriting",
      }),
    describtion: Joi.string()
      .required()
      .min(10)
      .message("eng kami 10 ta belgi !")
      .max(400)
      .message("ism 400 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "So'z bo'sh bo'lishi mummkin emas",
        "any.required": "So'z kiriting",
      }),
  });
  return Schamemodel.validate(body, {
    abortEarly: false,
  });
};
