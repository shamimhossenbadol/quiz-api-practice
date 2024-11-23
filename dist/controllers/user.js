"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCtrl = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const updateUser = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data)
        throw new ApiError_1.default(400, "Data is required");
    const previousData = res.locals.user;
    if (data === previousData)
        throw new ApiError_1.default(400, "No changes detected");
    yield prisma_1.default.user.update({ where: { id: previousData.id }, data });
    res.status(200).json({
        success: true,
        message: "User updated successfully",
    });
}));
const deleteUser = (0, catchAsync_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.delete({ where: { id: res.locals.user.id } });
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
}));
exports.userCtrl = { updateUser, deleteUser };
