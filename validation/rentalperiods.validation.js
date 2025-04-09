const Joi = require("joi");

exports.rentalperiodsValidation = (body) => {
  const Schamerentalperiods = Joi.object({
    contractId: Joi.number().required().messages({
      "string.empty": "contractId bo'lishi mummkin emas",
      "any.required": "contractId Bo'sh",
    }),
    start_at: Joi.date().default(Date.now),
    end_at: Joi.date().default(Date.now),
    daysum: Joi.number().required().messages({
      "string.empty": "days sum bo'lishi mummkin emas",
      "any.required": "day sum Bo'sh",
    }),
  });
  return Schamerentalperiods.validate(body, {
    abortEarly: false,
  });
};
