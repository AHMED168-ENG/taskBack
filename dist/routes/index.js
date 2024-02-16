"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authUser_routes_1 = __importDefault(require("./auth/authUser.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const task_routes_1 = __importDefault(require("./task/task.routes"));
class ApiRoutes {
    constructor(app) {
        this.app = app;
        this.authUserRouter = new authUser_routes_1.default();
        this.userRouter = new user_routes_1.default();
        this.TaskRouter = new task_routes_1.default();
        this.routes();
    }
    routes() {
        this.app.use("/api/auth", this.authUserRouter.router);
        this.app.use("/api/user", this.userRouter.router);
        this.app.use("/api/task", this.TaskRouter.router);
    }
}
exports.default = ApiRoutes;
