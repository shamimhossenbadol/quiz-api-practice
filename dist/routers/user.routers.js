"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protectedRouters = (0, express_1.Router)();
protectedRouters.get("/update-user", (req, res) => {
    res.send("update user router");
});
protectedRouters.get("/delete-user", (req, res) => {
    res.send("delete user router");
});
exports.default = protectedRouters;
