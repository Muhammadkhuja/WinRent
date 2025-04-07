const Joi = require("joi");

exports.cardValidation = (body) => {
  const Schamecard = Joi.object({
    number: Joi.string()
      .pattern(/^\d{16}$/)
      .length(16)
      .message("16 ta son bo'lsin")
      .required()
      .messages({
        "string.empty": "Bo'sh bo'lishi mummkin emas",
        "any.required": "Bo'sh",
      }),
    date: Joi.date().default(Date.now),
    card_holeder: Joi.string()
      .required()
      .min(4)
      .message("eng kami 4 ta belgi !")
      .max(30)
      .message("ism 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "So'z bo'sh bo'lishi mummkin emas",
        "any.required": "So'z kiriting",
      }),
    card_type: Joi.string().valid("Uzcard", "Humo"),
    userId: Joi.number()
      .required()
      .messages({
        "string.empty": "Bo'sh bo'lishi mummkin emas",
        "any.required": "Bo'sh",
      }),
  });
  return Schamecard.validate(body, {
    abortEarly: false,
  });
};
