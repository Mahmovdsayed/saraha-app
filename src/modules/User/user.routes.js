import { Router } from "express";
import * as userController from "./user.controller.js";
import expressAsyncHandler from "express-async-handler";

const router = Router();
//===========================signup========================
router.post("/signup", expressAsyncHandler(userController.SignupAPI));
//===========================signin========================
router.post("/signin", expressAsyncHandler(userController.SigninAPI));
//===========================update account========================
router.put("/updateUser", expressAsyncHandler(userController.updateAccount));
//===========================get user data========================
router.get("/:_id", expressAsyncHandler(userController.getUserData));
//===========================delete account========================
router.delete("/deleteUser", expressAsyncHandler(userController.deleteUser));

export default router;
