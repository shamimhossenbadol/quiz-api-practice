"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const signUpCtr = (0, catchAsync_1.default)((req, res, _next) => {
    const data = req.body;
    if (!data.email)
        throw new ApiError_1.default(400, "Email is required");
    data.password = bcrypt_1.default.hashSync(data.password, 10);
    prisma_1.default.user.create({ data });
    res.status(200).json({
        success: true,
        message: "Sign Up successfully",
    });
});
exports.default = signUpCtr;
