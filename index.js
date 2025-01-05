import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectMongo from "./config/mongodbConnect.js";
import ErrorMiddleware from "./middlewares/Error.middleware.js";
import userRoute from "./routes/user.route.js";
import ResponseInterceptor from "./middlewares/ResponseInterceptor.middleware.js";
dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: process.env.FRONT_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({ crossOriginResourcePolicy: false }));
// app.use(ResponseInterceptor);

// all route .....
app.use("/user", userRoute);

// custome error ..........
app.use(ErrorMiddleware);

// Response Interceptor ...

app.post("/", (req, res) => {
  res.json({ message: "Server running..." });
});

app.all("*", (req, res) => {
  res.status(404).json({
    status: false,
    method: req.method,
    message: `Route ${req.originalUrl} not found`,
  });
});

connectMongo().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});
