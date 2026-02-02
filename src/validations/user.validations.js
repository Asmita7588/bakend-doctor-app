import Joi from "@hapi/joi";

const userValidator = Joi.object({
  //     firstName: Joi.string().firstName().required().max(255).messages({
  //     "string.firstName": "Valid firstName is required",
  //     "any.required": "firstName is required",
  //     "string.max": "firstName should not exceed 255 characters",
  //   }),
  firstName: Joi.string().min(2).max(30).required(),
   lastName: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().required().max(255).messages({
    "string.email": "Valid email is required",
    "any.required": "Email is required",
    "string.max": "Email should not exceed 255 characters",
  }),
  gender: Joi.string().valid('male', 'female', 'other').required()
        .messages({ 'any.only': 'Gender must be male, female, or other' }),
  mobileNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be exactly 10 digits",
    }),
  role: Joi.string().valid("DOCTOR", "ADMIN", "RECEPTIONIST", "PATIENT").optional(),
  password: Joi.string().min(8).required(),
});

export const validateUser = async (req, res, next) => {
  try {
    await userValidator.validateAsync(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.details, // Send back Joi validation errors
    });
  }
};
