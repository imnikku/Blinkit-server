import ErrorHandler from "../utils/ErrorHandler.util.js";

const ValidateMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const err = error.details[0];
    let message = "";
    switch (err.type) {
      case "string.empty":
        message = `${err.context.key} is required`;
        break;
      case "string.min":
        message = `${err.context.key} must be at least ${err.context.limit} characters`;
        break;
      case "string.max":
        message = `${err.context.key} must be at most ${err.context.limit} characters`;
      case "string.email":
        message = `${err.context.key} must be a valid email address`;
      case "string.pattern.name":
        message = `password must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character`;
        break;
      case "any.only":
        message = `${err.context.key} must match the password.`;
        break;
      default:
        break;
    }
    console.log(err);
    return next(
      new ErrorHandler(message ? message : error.details[0].message, 400)
    );
  }
  next();
};

export default ValidateMiddleware;
