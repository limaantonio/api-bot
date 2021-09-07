"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var database_1 = __importDefault(require("./database"));
var routes_1 = require("./routes");
var mongoose = require("mongoose");
//const cors = require('cors');
(0, database_1.default)();
var app = (0, express_1.default)();
exports.app = app;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(express_1.default.json());
//app.use(cors());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.routes);
