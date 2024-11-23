import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import prisma from "../utils/prisma";
import ApiError from "../utils/ApiError";

const verifyAuth = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new ApiError(401, "Unauthorized access");

  const jwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET ?? "jsonwebtoken",
  );

  const user = await prisma.user.findUnique({
    where: { id: (jwtPayload as JwtPayload).id },
  });
  if (!user) throw new ApiError(401, "Invalid token");

  res.locals.user = user;
  next();
});

export default verifyAuth;
