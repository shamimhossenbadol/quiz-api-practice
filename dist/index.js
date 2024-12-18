"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers/routers"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", routers_1.default);
app.use(errorHandler_1.default);
app.listen("3000", () => console.log("server is running"));
