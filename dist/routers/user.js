"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
const user_1 = require("../controllers/user");
const protectedRouters = (0, express_1.Router)();
protectedRouters.get("/update-user", verifyAuth_1.default, user_1.userCtrl.updateUser);
protectedRouters.get("/delete-user", verifyAuth_1.default, user_1.userCtrl.deleteUser);
exports.default = protectedRouters;
