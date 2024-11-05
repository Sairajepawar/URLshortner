"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/link", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.body.code;
    try {
        const link = yield (0, db_1.getLink)(code);
        if (link == "failed") {
            throw new Error("Code not present in Database/ Expired");
        }
        res.json({
            link: link
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}));
app.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let link = req.body.link;
    const check = "https://";
    if (link.length < check.length || link.substring(0, check.length) != check) {
        link = check + link;
    }
    try {
        let code = yield (0, db_1.createRoute)(link);
        if (code == undefined) {
            throw new Error("Code generation failed");
        }
        res.json({
            code: code,
            message: "Successfully Done"
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}));
// for check whether backend is accessible or not
app.get("/hello", (req, res) => {
    res.send("Hello World!");
});
app.listen(3000, () => {
    console.log("Server started");
});
