const Joi = require("joi");

exports.paymentsValidation = (body) => {
  const Schameapayment = Joi.object({
    contractId: Joi.number().required().messages({
      "string.empty": "Bo'sh bo'lishi mummkin emas",
      "any.required": "Bo'sh",
    }),
    amount: Joi.number().precision(2).positive().required().messages({
      "string.empty": "Bo'sh bo'lishi mummkin emas",
      "any.required": "Bo'sh",
    }),
    status: Joi.string().valid("paid", "unpaid", "process", "canceled").required(),
    payment: Joi.string().required(),
    payment_date: Joi.date().default(Date.now),
  });
  return Schameapayment.validate(body, {
    abortEarly: false,
  });
};
