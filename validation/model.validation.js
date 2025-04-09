const Joi = require("joi");

exports.modelValidation = (body) => {
  const Schamemodel = Joi.object({
    categoryId: Joi.number().required().messages({
      "string.empty": "Bo'sh bo'lishi mummkin emas",
      "any.required": "Bo'sh",
    }),
    name: Joi.string()
      .required()
      .min(4)
      .message("model nomi eng kami 4 ta belgi !")
      .max(30)
      .message("model nomi 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "model nomi bo'sh bo'lishi mummkin emas",
        "any.required": "model nomi kiriting",
      }),
    brand: Joi.string()
      .required()
      .min(4)
      .message("brend nomida eng kami 4 ta belgi !")
      .max(30)
      .message("brend nomida 30 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "brend nomi bo'sh bo'lishi mummkin emas",
        "any.required": "brend nomi kiriting",
      }),
    describtion: Joi.string()
      .required()
      .min(10)
      .message("describtionda eng kami 10 ta belgi !")
      .max(400)
      .message("describtionda ism 400 ta belgidan ko'p bo'lmasin !")
      .messages({
        "string.empty": "describtionda bo'sh bo'lishi mummkin emas",
        "any.required": "describtionda kiriting",
      }),
  });
  return Schamemodel.validate(body, {
    abortEarly: false,
  });
};
