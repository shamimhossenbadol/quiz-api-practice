import catchAsync from "../utils/catchAsync";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

const logIn = catchAsync(async (req, res, _next) => {
  const { email, password } = req.body;
  if (!email) throw new ApiError(400, "Email is required");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(400, "User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(400, "Wrong password");
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET ?? "jsonwebtoken",
  );
  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token: token,
  });
});

const signUp = catchAsync(async (req, res, _next) => {
  const data = req.body;
  if (!data.email) throw new ApiError(400, "Email is required");
  data.password = await bcrypt.hash(data.password, 10);
  await prisma.user.create({ data });
  res.status(200).json({
    success: true,
    message: "Sign Up successfully",
  });
});

export const authCtrl = { logIn, signUp };
