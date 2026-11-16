import {Router} from "express";
import {register, getuser,refreshtoken} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register",register);
authRouter.get("/getuser",getuser);
authRouter.get("/refreshtoken",refreshtoken)

export default authRouter;