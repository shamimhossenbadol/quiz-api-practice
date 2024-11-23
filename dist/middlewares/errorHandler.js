"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const errorHandler = (err, _req, res, _next) => {
    let statusCode = err.statusCode || 500;
    let errorMessage = err.message || "Something went wrong";
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = 409;
            errorMessage = "Email already exists";
        }
        else {
            statusCode = 400;
            errorMessage = "Bad Request";
        }
    }
    if (err instanceof ApiError_1.default) {
        statusCode = err.statusCode;
        errorMessage = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message: errorMessage,
    });
};
exports.default = errorHandler;
