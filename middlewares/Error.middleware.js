import ErrorHandler from "../utils/ErrorHandler.util.js";

function ErrorMiddleware(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  // wrong mongodb id error ........

  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)[0]} already exists`;
    err = new ErrorHandler(message, 500);
  }
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;

    err = new ErrorHandler(message, 500);
  }

  res.status(err.statusCode).json({
    status: false,
    message: err.message,
    data: null,
  });
}

export default ErrorMiddleware;
