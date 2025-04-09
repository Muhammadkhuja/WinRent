const Joi = require("joi");

exports.cardValidation = (body) => {
  const Schamecard = Joi.object({
    number: Joi.string()
      .pattern(/^\d{16}$/)
      .length(16)
      .message("16 ta son bo'lsin")
      .required()
      .messages({
        "string.empty": "karta raqam bo'lishi mummkin emas",
        "any.required": "karta raqam ?",
      }),
    date: Joi.date().default(Date.now),
    card_holeder: Joi.string()
      .required()
      .min(4)
      .message("Karta egasi malumoti kami 4 ta belgi !")
      .max(30)
      .message("Karta egasi malumoti 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "Karta egasi malumoti bo'sh bo'lishi mummkin emas",
        "any.required": "Karta egasi malumoti kiriting",
      }),
    card_type: Joi.string().valid("Uzcard", "Humo"),
    userId: Joi.number().required().messages({
      "string.empty": "userId bo'lishi mummkin emas",
      "any.required": "userId",
    }),
  });
  return Schamecard.validate(body, {
    abortEarly: false,
  });
};
