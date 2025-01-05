import AsyncMiddleware from "../middlewares/Async.middleware.js";
import createActivationToken from "../utils/ActivationToken.util.js";
import DecodeJwtToken from "../utils/DecodeJwtToken.utils.js";
import ErrorHandler from "../utils/ErrorHandler.util.js";
import sendEmail from "../utils/SendEmail.util.js";
import userModel from "../models/user.model.js";
import encodeActivationToken from "../utils/EncodeJwtToken.util.js";

// ********************** register user **********************
export const registerUserController = AsyncMiddleware(
  async (req, res, next) => {
    const { email, name, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return next(
        new ErrorHandler("Email already exists. Please try logging in.", 400)
      );
    }
    const activationToken = createActivationToken({ name, email, password });
    const data = {
      user: { name },
      url: `${process.env.FRONT_URL}/verify-email?code=${activationToken}`,
    };

    await sendEmail({
      email: email,
      subject: "Activate your account",
      template: "activation-mail.ejs",
      data,
    });

    return res.json({
      status: true,
      message: `Please check your mail: ${email} to activate your account`,
      data: activationToken,
    });
  }
);

// ************************* activate user ****************

export const activateUserController = AsyncMiddleware(
  async (req, res, next) => {
    console.log(req.query.token);
    const user = DecodeJwtToken(req?.query?.token);
    if (!user) {
      return next(
        new ErrorHandler(
          "Invalid or expired token. Please try again or request a new one.",
          401
        )
      );
    }
    const data = await userModel.create(user);
    return res.json({
      status: true,
      message: "User activated successfully.",
      data,
    });
  }
);

// ************************* Login user *********************

export const loginUserController = AsyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 404));
  }
  const comparePassword = await user.comparePassword(password);
  if (!comparePassword) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  return res.json({
    status: true,
    message: "User login successfully.",
    data: user,
    token: encodeActivationToken({ _id: user._id, email: user.email }),
  });
});