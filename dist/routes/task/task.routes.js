"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const task_controller_1 = __importDefault(require("../../controller/task/task.controller"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const task_validation_1 = __importDefault(require("../../validations/task/task.validation"));
const helper_1 = require("../../helper/helper");
class TaskRouter {
    constructor() {
        this.taskValidation = new task_validation_1.default();
        this.taskController = new task_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.imagesOperations = new helper_1.ImageOperations();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.userAuth.Auth, this.taskValidation.createTask(), handelBodyError_1.default, this.taskController.create);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.taskValidation.updateTask(), handelBodyError_1.default, this.taskController.updateOne);
        this.router.get("/", this.userAuth.Auth, this.taskValidation.checkPaginationParams(), handelBodyError_1.default, this.taskController.find);
        this.router.get("/:id", this.userAuth.Auth, validateMongodbId_1.default, this.taskController.findOne);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.taskController.deleteOne);
    }
}
exports.default = TaskRouter;
