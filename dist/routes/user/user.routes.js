"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validation_1 = __importDefault(require("../../validations/users/user.validation"));
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const user_controller_1 = __importDefault(require("../../controller/user/user.controller"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const filterBody_1 = __importDefault(require("../../middleware/filterBody"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
class UserRouter {
    constructor() {
        this.userValidation = new user_validation_1.default();
        this.userController = new user_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.filterBody = new filterBody_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.userValidation.createUser(), this.userAuth.Auth, handelBodyError_1.default, this.userController.create);
        this.router.put("/update-my-account", this.userAuth.Auth, this.filterBody.filter(["firstName", "email", "lastName", "password"]), this.userValidation.updateProfile(), handelBodyError_1.default, this.userController.updateProfile);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userValidation.updateUser(), handelBodyError_1.default, this.userController.updateOne);
        this.router.get("/", this.userAuth.Auth, this.userController.find);
        this.router.get("/profile", this.userAuth.Auth, this.userController.getProfile);
        this.router.get("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userController.findOne);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userController.deleteOne);
    }
}
exports.default = UserRouter;
