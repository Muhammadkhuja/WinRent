const Joi = require("joi");

exports.productsValidation = (body) => {
  const Schameaproducts = Joi.object({
    ownerId: Joi.number().required().messages({
          "string.empty": "Bo'sh bo'lishi mummkin emas",
          "any.required": "Bo'sh",
        }),
    modelId: Joi.number().required().messages({
          "string.empty": "Bo'sh bo'lishi mummkin emas",
          "any.required": "Bo'sh",
        }),
    name: Joi.string().required()
          .min(4)
          .message("eng kami 4 ta belgi !")
          .max(30)
          .message("ism 30 ta belgidan ko'p bo'lmasin !")
          .messages({
            "string.empty": "So'z bo'sh bo'lishi mummkin emas",
            "any.required": "So'z kiriting",
          }),
    price: Joi.number().precision(2).positive().required().messages({
          "string.empty": "Bo'sh bo'lishi mummkin emas",
          "any.required": "Bo'sh",
        }),
    status: Joi.string().valid("paid", "unpaid", "process", "canceled").required(),
    created_at: Joi.date().default(Date.now),
  });
  return Schameaproducts.validate(body, {
    abortEarly: false,
  });
};
