const Joi = require("joi");

exports.contractValidation = (body) => {
  const Schamecontract = Joi.object({

    is_creator: Joi.boolean().default(false),
    is_active: Joi.boolean().default(false),
    refresh_token: Joi.string(),
    activation_link: Joi.string(),

        userId: Joi.number().required().messages({
          "string.empty": "Bo'sh bo'lishi mummkin emas",
          "any.required": "Bo'sh",
        }),
        productId: Joi.number().required().messages({
          "string.empty": "Bo'sh bo'lishi mummkin emas",
          "any.required": "Bo'sh",
        }),
        statusId: Joi.number().required().messages({
          "string.empty": "Bo'sh bo'lishi mummkin emas",
          "any.required": "Bo'sh",
        }),
        start_at: Joi.date().default(Date.now),
        end_at: Joi.boolean().default(false),
        created_at: Joi.boolean().default(false),
  });
  return Schamecontract.validate(body, {
    abortEarly: false,
  });
};
