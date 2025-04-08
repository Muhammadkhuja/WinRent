const Joi = require("joi");

exports.userValidation = (body) => {
  const Schameuser = Joi.object({
    full_name: Joi.string()
      .required()
      .min(4)
      .message("eng kami 4 ta belgi !")
      .max(30)
      .message("ism 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "name bo'sh bo'lishi mummkin emas",
        "any.required": "Name kiriting",
      }),
    passport: Joi.string()
      .pattern(/^[A-Z]{2}[0-9]{6}$/)
      .min(7)
      .message("eng kamida 7 ta belgi")
      .max(10)
      .message("eng kopida 10 ta belgi bo'lsin")
      .required()
      .messages({
        "string.empty": "Pasport raqami bo'sh bo'lishi mumkin emas",
        "any.required": "Pasport raqamini kiritish majburiy",
      }),
    phone: Joi.string()
      .required()
      .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
      .message("namuna: 12-345-67-89, ga ox'shagan bo'lishi kerak !")
      .messages({
        "string.empty": "raqan' bo'sh bo'lishi mummkin emas",
        "any.required": "Raqam kiriting",
      }),
    email: Joi.string().email().lowercase().required().messages({
      "string.empty": "Email bo'sh bo'lishi mummkin emas",
      "any.required": "Email kiriting",
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9!$@#]{6,30}$"))
      .required(),
    address: Joi.string().required().messages({
      "string.empty": "Addres bo'sh bo'lishi mummkin emas",
      "any.required": "Address kiriting",
    }),
    is_active: Joi.boolean().default(false),
    registered_at: Joi.date().default(Date.now),
    refresh_token: Joi.string(),
    activation_link: Joi.string(),
  });
  return Schameuser.validate(body, {
    abortEarly: false,
  });
};


