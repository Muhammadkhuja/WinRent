const Joi = require("joi");

exports.ownerValidation = (body) => {
  const Schameowner = Joi.object({
    full_name: Joi.string()
      .required()
      .min(4)
      .message("full_nameda kami 4 ta belgi !")
      .max(30)
      .message("full_nameda 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "full_nameda bo'sh bo'lishi mummkin emas",
        "any.required": "full_nameda kiriting",
      }),
    phone: Joi.string()
      .required()
      .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
      .message("namuna: 12-345-67-89, ga ox'shagan bo'lishi kerak !")
      .messages({
        "string.empty": "raqam bo'sh bo'lishi mummkin emas",
        "any.required": "Raqam kiriting",
      }),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9!$@#]{6,30}$"))
      .required()
      .messages({
        "string.empty": "password bo'sh bo'lishi mummkin emas",
        "any.required": "password kiriting",
      }),
    address: Joi.string().required().messages({
      "string.empty": "Addres bo'sh bo'lishi mummkin emas",
      "any.required": "Address kiriting",
    }),
    created_at: Joi.date().default(Date.now),
    is_active: Joi.boolean().default(false),
    refresh_token: Joi.string(),
    activation_link: Joi.string(),
  });
  return Schameowner.validate(body, {
    abortEarly: false,
  });
};
