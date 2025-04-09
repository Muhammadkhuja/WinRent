const Joi = require("joi");

exports.contractValidation = (body) => {
  const Schamecontract = Joi.object({
    is_creator: Joi.boolean().default(false),
    is_active: Joi.boolean().default(false),
    refresh_token: Joi.string(),
    activation_link: Joi.string(),

    userId: Joi.number().required().messages({
      "string.empty": "contracts userId Bo'sh bo'lishi mummkin emas",
      "any.required": "contracts userId Bo'sh",
    }),
    productId: Joi.number().required().messages({
      "string.empty": "contracts productId Bo'sh bo'lishi mummkin emas",
      "any.required": "Bo'sh",
    }),
    statusId: Joi.number().required().messages({
      "string.empty": "contracts statusId Bo'sh bo'lishi mummkin emas",
      "any.required": "contracts statusId Bo'sh",
    }),
    start_at: Joi.date().iso(),
    end_at: Joi.date().iso(),
    created_at: Joi.date().default(Date.now),
  });
  return Schamecontract.validate(body, {
    abortEarly: false,
  });
};
