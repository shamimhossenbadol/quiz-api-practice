import { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import ApiError from "../utils/ApiError";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || "Something went wrong";

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      errorMessage = "Email already exists";
    } else {
      statusCode = 400;
      errorMessage = err.message;
    }
  }
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};
export default errorHandler;
