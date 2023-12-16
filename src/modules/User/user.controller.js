import { StatusCodes, getReasonPhrase } from "http-status-codes";
import User from "../../../DB/models/user.model.js";
import bycrypt from "bcryptjs";
//===========================signup========================
export const SignupAPI = async (req, res, next) => {
  const { username, email, password } = req.body;
  // username check
  const isUserNameDuplicate = await User.findOne({ username });
  if (isUserNameDuplicate) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "username already in exist" });
  }
  //email check
  const isEmailDuplicate = await User.findOne({ email });
  if (isEmailDuplicate) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "email already in exist" });
  }
  //hash password
  const hashedPassword = bycrypt.hashSync(password, +process.env.SALT_ROUNDS);
  const createdUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (!createdUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User registration failed" });
  }
  return res.status(StatusCodes.OK).json({
    message: "User registration seccess",

    createdUser,
  });
};
//===========================signin========================

export const SigninAPI = async (req, res, next) => {
  const { username, email, password } = req.body;
  // username or email
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid login credentials" });
  }
  // password
  const isPasswordMatch = bycrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid login credentials" });
  }
  return res.status(StatusCodes.OK).json({
    message: "login success",
  });
};
//===========================update account========================

export const updateAccount = async (req, res, next) => {
  const { username, email } = req.body;
  const { _id } = req.query;
  let updateObject = {};
  // username not exists
  if (username) {
    const isUserNameDuplicate = await User.findOne({ username });
    if (isUserNameDuplicate) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "username already in exist" });
    }
    updateObject.username = username;
  }
  // email not exists
  if (email) {
    const isUserEmailDuplicate = await User.findOne({ email });
    if (isUserEmailDuplicate) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "email already in exist" });
    }
    updateObject.email = email;
  }
  const updatedUser = await User.updateOne({ _id }, updateObject);
  if (!updatedUser.modifiedCount) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "invalid userId" });
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "user updated successfully" });
};
//===========================delete account========================

export const deleteUser = async (req, res, next) => {
  const { _id, loggedInId } = req.query; // account , logged in id
  if (_id !== loggedInId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: " deleted fail-Unauthorized" });
  }
  const user = await User.findByIdAndDelete({ _id });
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "invalid ID" });
  }
  return res.status(StatusCodes.OK).json({
    message: `deleted success`,
  });
};
//===========================get user data========================

export const getUserData = async (req, res, next) => {
  const { _id } = req.params;
  const user = await User.findById(_id, "username");
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "invalid userID",
    });
  }
  return res.status(StatusCodes.OK).json({
    message: "Done",
    user,
  });
};
