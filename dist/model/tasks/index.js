"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema_1 = __importDefault(require("./schemas/taskSchema"));
const tbl_task = mongoose_1.default.model("tbl_task", taskSchema_1.default);
exports.default = tbl_task;
