const Joi = require("joi");

exports.productsValidation = (body) => {
  const Schameaproducts = Joi.object({
    ownerId: Joi.number().required().messages({
      "string.empty": "ownerId bo'lishi mummkin emas",
      "any.required": "ownerId Bo'sh",
    }),
    modelId: Joi.number().required().messages({
      "string.empty": "modelId bo'lishi mummkin emas",
      "any.required": "modelId",
    }),
    name: Joi.string()
      .required()
      .min(4)
      .message("nameda kami 4 ta belgi !")
      .max(30)
      .message("nameda 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "name bo'sh bo'lishi mummkin emas",
        "any.required": "name kiriting",
      }),
    price: Joi.number().precision(2).positive().required().messages({
      "string.empty": "Bo'sh bo'lishi mummkin emas",
      "any.required": "Bo'sh",
    }),
    status: Joi.string()
      .valid("paid", "unpaid", "process", "canceled")
      .required(),
    created_at: Joi.date().default(Date.now),
  });
  return Schameaproducts.validate(body, {
    abortEarly: false,
  });
};
