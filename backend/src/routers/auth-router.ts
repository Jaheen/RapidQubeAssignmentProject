import * as BodyParser from "body-parser";
import { AuthController } from "controllers";
import { Router } from "express";

const AuthRouter: Router = Router()

AuthRouter.use(BodyParser.json())

AuthRouter.post("/login", AuthController.login)
AuthRouter.post("/signup", AuthController.signup)
AuthRouter.post("/verifyToken", AuthController.verifyToken)

export default AuthRouter
