"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const routers = [
    { path: "/auth", router: auth_1.default },
    { path: "/user", router: user_1.default },
];
const appRouters = (0, express_1.Router)();
routers.forEach((router) => {
    appRouters.use(router.path, router.router);
});
exports.default = appRouters;
