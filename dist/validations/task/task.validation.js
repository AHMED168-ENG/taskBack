"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const tasks_services_1 = __importDefault(require("../../services/tasks/tasks.services"));
class TaskValidation {
    name(id) {
        return (0, express_validator_1.check)("name").notEmpty().withMessage("enter task name please").custom((val, { req }) => __awaiter(this, void 0, void 0, function* () {
            const taskService = new tasks_services_1.default();
            let query = { name: val };
            if (id)
                query._id = { $ne: req.params.id };
            const task = yield taskService.findWithQuery(query);
            if (task)
                return Promise.reject("");
            return true;
        })).withMessage("this task name entered before").trim();
    }
    description() {
        return (0, express_validator_1.check)("description").notEmpty().withMessage("enter task description please").trim();
    }
    dueDate() {
        return (0, express_validator_1.check)("dueDate").notEmpty().withMessage("enter task due date please").isDate();
    }
    tags() {
        return (0, express_validator_1.check)("tags").notEmpty().withMessage("enter tags please").isArray().withMessage("enter tags please");
    }
    tagsUpdate() {
        return (0, express_validator_1.check)("tags").optional().isArray().withMessage("enter tags please");
    }
    createTask() {
        return [
            this.name(),
            this.description(),
            this.dueDate(),
            this.tags()
        ];
    }
    updateTask() {
        return [
            this.name(true),
            this.description(),
            this.tagsUpdate(),
            this.tags()
        ];
    }
    page() {
        return (0, express_validator_1.query)("page").isInt();
    }
    limit() {
        return (0, express_validator_1.query)("limit").isInt({ gt: 0 });
    }
    width() {
        return (0, express_validator_1.check)("width").notEmpty().isNumeric();
    }
    height() {
        return (0, express_validator_1.check)("height").notEmpty().isNumeric();
    }
    imageDimension() {
        return [this.width(), this.height()];
    }
    checkPaginationParams() {
        return [
            this.page(),
            this.limit()
        ];
    }
}
exports.default = TaskValidation;
