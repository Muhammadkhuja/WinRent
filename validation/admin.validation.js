const Joi = require("joi");

exports.adminValidation = (body) => {
  const Schameadmin = Joi.object({
    full_name: Joi.string().required()
      .min(4)
      .message("eng kami 4 ta belgi !")
      .max(30)
      .message("ism 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "So'z bo'sh bo'lishi mummkin emas",
        "any.required": "So'z kiriting",
      }),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9!$@#]{6,30}$")).required(),
    created_at: Joi.date().default(Date.now),
    is_creator: Joi.boolean().default(false),
    is_active: Joi.boolean().default(false),
    refresh_token: Joi.string(),
    activation_link: Joi.string(),
  });
  return Schameadmin.validate(body, {
    abortEarly: false,
  });
};
