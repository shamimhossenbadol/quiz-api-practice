"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUp_1 = __importDefault(require("../controllers/signUp"));
const logIn_1 = __importDefault(require("../controllers/logIn"));
const authRouters = (0, express_1.Router)();
//authRouters
authRouters.post("/sign-up", signUp_1.default);
authRouters.post("/log-in", logIn_1.default);
exports.default = authRouters;
