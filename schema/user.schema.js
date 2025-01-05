import Joi from "joi";

// ***************** Register Schama ************************
export const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()

    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,15}$/,
      "password"
    )
    .required(),
  confirm_password: Joi.string().required().valid(Joi.ref("password")),
}).unknown(false);

// ******************** Login Schema ***************************
export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(false);
