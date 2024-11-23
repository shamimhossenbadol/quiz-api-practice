import catchAsync from "../utils/catchAsync";
import prisma from "../utils/prisma";
import ApiError from "../utils/ApiError";

const updateUser = catchAsync(async (req, res, _next) => {
  const name = req.body.name;
  if (!name) throw new ApiError(400, "Data is required");
  const previousName = res.locals.user.name;
  if (name === previousName) throw new ApiError(400, "No changes detected");
  await prisma.user.update({
    where: { id: res.locals.user.id },
    data: { name: name },
  });
  res.status(200).json({
    success: true,
    message: "User updated successfully",
  });
});

const deleteUser = catchAsync(async (_req, res, _next) => {
  const userId = res.locals.user.id;
  await prisma.user.delete({ where: { id: userId } });
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const userCtrl = { updateUser, deleteUser };
