const Joi = require("joi");

exports.categoryValidation = (body) => {
  const Schamecategory = Joi.object({
    name: Joi.string().required()
      .min(2)
      .message("eng kami 2 ta belgi !")
      .max(30)
      .message("ism 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "Bo'sh bo'lishi mummkin emas",
        "any.required": "Bo'sh",
      }),
    about: Joi.string().required()
      .min(10)
      .message("eng kami 10 ta belgi !")
      .max(300)
      .message("ism 300 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "Bo'sh bo'lishi mummkin emas",
        "any.required": "Bo'sh",
      }),

  });
  return Schamecategory.validate(body, {
    abortEarly: false,
  });
};
