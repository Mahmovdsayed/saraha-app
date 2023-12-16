import { StatusCodes } from "http-status-codes";

export const globalResponse = (err, req, res, next) => {
  if (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      errMsg: err.message,
    });
  }
};
