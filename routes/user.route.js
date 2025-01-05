import { Router } from "express";
import {
  activateUserController,
  loginUserController,
  registerUserController,
} from "../controllers/user.controller.js";
import ValidateMiddleware from "../middlewares/Validate.middleware.js";
import { userLoginSchema, userRegisterSchema } from "../schema/user.schema.js";
const router = Router();

router.post(
  "/register",
  ValidateMiddleware(userRegisterSchema),
  registerUserController
);

router.get("/activate", activateUserController);

router.post("/login", ValidateMiddleware(userLoginSchema), loginUserController);

export default router;
