import { StatusCodes } from "http-status-codes";
import User from "../../../DB/models/user.model.js";
import Messages from "../../../DB/models/message.model.js";

//====================send message =================
export const sendMessage = async (req, res, next) => {
  const { content } = req.body;
  const { sendTo } = req.params;
  // user check
  const isUserExists = await User.findById(sendTo);
  if (!isUserExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `User not found` });
  }
  const createdMessage = await Messages.create({ content, sendTo });
  if (!createdMessage) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Message creation failed" });
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "Message created successfully" });
};

export const deleteMessage = async (req, res, next) => {
  const { loggedInUserId, messageId } = req.query;
  const deletedMessage = await Messages.findOneAndDelete({
    _id: messageId,
    sendTo: loggedInUserId,
  });
  if (!deletedMessage) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "can't delete message" });
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "Message deleted successfully" });
};

export const markMessageAsViewed = async (req, res, next) => {
  const { loggedInUserId, messageId } = req.query;

  const updatedMessage = await Messages.findOneAndUpdate(
    { _id: messageId, sendTo: loggedInUserId, isViewed: false },
    { isViewed: true, $inc: { __v: 1 } },
    { new: true }
  );
  if (!updatedMessage) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "can't update message" });
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "Message updated successfully", updatedMessage });
};

export const listUserMessages = async (req, res, next) => {
  const { loggedInUserId, isViewed } = req.query;
  const messages = await Messages.find({
    sendTo: loggedInUserId,
    isViewed,
  }).sort({ createdAt: -1 });
  if (!messages.length) {
    return res.status(StatusCodes.OK).json({ message: "no messages" });
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "your messages", messages });
};
