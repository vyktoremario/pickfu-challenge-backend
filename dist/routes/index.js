"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var answerController_1 = require("../controllers/answerController");
var router = express_1.default.Router();
/* GET home page. */
router.get('/answers', answerController_1.getAllAnswers);
exports.default = router;
