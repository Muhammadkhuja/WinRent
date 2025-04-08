const Joi = require("joi");

exports.statusValidation = (body) => {
  const Schamestatus = Joi.object({
    entry_type: Joi.string()
      .valid("paid", "unpaid", "process", "canceled", "invalid")
      .required(),
    entry_id: Joi.number().precision(2).positive().required().messages({
      "string.empty": "Bo'sh bo'lishi mummkin emas",
      "any.required": "Bo'sh",
    }),
    status: Joi.string()
      .required()
      .min(10)
      .max(150)
      .message("Kopi bilan 150 ta belgi bo'lishi kerak !")
      .messages({
        "string.empty": "So'z bo'sh bo'lishi mummkin emas",
        "any.required": "So'z kiriting",
      }),
    update_at: Joi.date().default(Date.now),
  });
  return Schamestatus.validate(body, {
    abortEarly: false,
  });
};
