import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError";
import prisma from "../utils/prisma";

const insertQuestion = catchAsync(async (req, res, _next) => {
  const required = [
    "question",
    "option1",
    "option2",
    "option3",
    "option4",
    "answer",
  ];
  required.forEach((key) => {
    if (!req.body[key]) {
      throw new ApiError(400, `${key} is required`);
    }
  });
  const { question, option1, option2, option3, option4, answer } = req.body;
  const options = [option1, option2, option3, option4];
  if (!options.includes(answer)) {
    throw new ApiError(400, "Answer must be one of the options");
  }
  const user = res.locals.user;
  const questionCreated = await prisma.questions.create({
    data: {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      createdBy: {
        connect: { id: user.id },
      },
    },
  });
  res.status(200).json({
    success: true,
    message: `Question created using id ${questionCreated.id}`,
  });
});

const updateQuestion = catchAsync(async (req, res, _next) => {
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Question id is required");
  const preQuestion = await prisma.questions.findUnique({ where: { id } });
  if (!preQuestion) throw new ApiError(404, "Question not found");
  const user = res.locals.user;
  if (user.role !== "ADMIN" && user.id !== preQuestion.userId) {
    throw new ApiError(401, "Unauthorized access");
  }
  const required = [
    "question",
    "option1",
    "option2",
    "option3",
    "option4",
    "answer",
  ];
  required.forEach((key) => {
    if (!req.body[key]) {
      throw new ApiError(400, `${key} is required`);
    }
  });
  const { question, option1, option2, option3, option4, answer } = req.body;
  const options = [option1, option2, option3, option4];
  if (!options.includes(answer)) {
    throw new ApiError(400, "Answer must be one of the options");
  }
  await prisma.questions.update({
    where: { id },
    data: {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
    },
  });
  res.status(200).json({
    success: true,
    message: "Question updated successfully",
  });
});
const deleteQuestion = catchAsync(async (req, res, _next) => {
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Question id is required");
  const question = await prisma.questions.findUnique({ where: { id } });
  if (!question) throw new ApiError(404, "Question not found");
  const user = res.locals.user;
  if (user.id !== question.userId || user.role !== "ADMIN") {
    throw new ApiError(401, "Unauthorized");
  }
  await prisma.questions.delete({ where: { id } });
  res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
});
const getQuestion = catchAsync(async (req, res, _next) => {
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Question id is required");
  const question = await prisma.questions.findUnique({
    where: { id },
    include: { createdBy: true },
  });
  if (!question) throw new ApiError(404, "Question not found");
  res.status(200).json({
    success: true,
    message: "Question fetched successfully",
    data: question,
  });
});
const getAllQuestions = catchAsync(async (req, res, _next) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const skip = (page - 1) * pageSize;
  const tQuestions = await prisma.questions.count();
  const inValidPage = skip >= tQuestions;
  if (inValidPage) throw new ApiError(400, "Invalid page number");
  const hasNextPage = skip + pageSize < tQuestions;
  const questions = await prisma.questions.findMany({
    skip: skip,
    take: pageSize,
  });
  res.status(200).json({
    success: true,
    message: "Questions fetched successfully",
    currentPage: page,
    pageSize: questions.length,
    hasNextPage: hasNextPage,
    data: questions,
  });
});
const getUserQuestions = catchAsync(async (req, res, _next) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const skip = (page - 1) * pageSize;
  const tQuestions = await prisma.questions.count();
  const inValidPage = skip >= tQuestions;
  if (inValidPage) throw new ApiError(400, "Invalid page number");
  const hasNextPage = skip + pageSize < tQuestions;
  const questions = await prisma.questions.findMany({
    where: { userId: res.locals.user.id },
    skip: skip,
    take: pageSize,
  });
  res.status(200).json({
    success: true,
    message: "Questions fetched successfully",
    currentPage: page,
    pageSize: questions.length,
    hsaNextPage: hasNextPage,
    data: questions,
  });
});
const getRandomQuestions = catchAsync(async (req, res, _next) => {
  const count = parseInt(req.params.count);
  const qCount = await prisma.questions.count({
    where: { approved: true },
  });
  console.log(qCount);
  const fcount = Math.min(count, qCount);
  const set = new Set<number>();
  while (set.size < fcount) {
    set.add(Math.floor(Math.random() * qCount));
  }
  const indices = Array.from(set);
  const questions = await Promise.all(
    indices.map((index) =>
      prisma.questions.findMany({
        orderBy: { approved: "desc" },
        skip: index,
        take: 1,
      }),
    ),
  );
  const flattenedQuestions = questions.flat();
  res.status(200).json({
    success: true,
    message: "Questions fetched successfully",
    data: flattenedQuestions,
  });
});

const approveQuestion = catchAsync(async (req, res, _next) => {
  if (res.locals.user.role !== "ADMIN") {
    throw new ApiError(401, "Unauthorized");
  }
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Question id is required");
  if (id.length !== 24) throw new ApiError(400, "Invalid question id");
  const question = await prisma.questions.findUnique({ where: { id } });
  if (!question) throw new ApiError(404, "Question not found");
  if (question.approved === true) {
    throw new ApiError(400, "Question already approved");
  }
  await prisma.questions.update({
    where: { id },
    data: { approved: true },
  });
  res.status(200).json({
    success: true,
    message: "Question approved successfully",
  });
});

export const questionCtr = {
  insertQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getUserQuestions,
  getAllQuestions,
  approveQuestion,
  getRandomQuestions,
};
