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
const tasks_1 = __importDefault(require("../../model/tasks"));
const helper_1 = require("../../helper/helper");
class TaskService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield tasks_1.default.create(body);
            return task;
        });
    }
    updateOne(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield tasks_1.default.findByIdAndUpdate(_id, body, { new: true });
            return task;
        });
    }
    find(query, sanitize, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let { limit, page, sort } = query;
            let others = new helper_1.Others();
            let newQuery = yield others.sanitizeQuery(query, ["name", "description", "tags"]);
            let newSort = yield others.sortDocs(sort);
            let tasks = tasks_1.default.paginate({ sort: newSort, limit, page, query: Object.assign(Object.assign({}, newQuery), { userId: id }) });
            return tasks;
        });
    }
    findOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield tasks_1.default.findOne({ _id });
            return task;
        });
    }
    findWithQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield tasks_1.default.findOne(query);
            return task;
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tasks_1.default.deleteOne({ _id });
            return;
        });
    }
}
exports.default = TaskService;
