"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouters = (0, express_1.Router)();
authRouters.post("/sign-up", (req, res) => {
    res.send("sign up router");
});
authRouters.post("/log-in", (req, res) => {
    res.send("log in router");
});
exports.default = authRouters;
