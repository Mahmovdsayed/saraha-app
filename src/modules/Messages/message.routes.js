import { Router } from "express";
import * as messageController from "./message.controller.js";
import expressAsyncHandler from "express-async-handler";

const router = Router();
router.post("/:sendTo", expressAsyncHandler(messageController.sendMessage));
router.delete(
  "/deleteMessage",
  expressAsyncHandler(messageController.deleteMessage)
);
router.put(
  "/updateMessage",
  expressAsyncHandler(messageController.markMessageAsViewed)
);
router.get(
  "/listUserMessages",
  expressAsyncHandler(messageController.listUserMessages)
);
export default router;
