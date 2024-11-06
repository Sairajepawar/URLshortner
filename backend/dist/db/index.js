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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoute = createRoute;
exports.getLink = getLink;
const pg_1 = require("pg");
const config = {
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.CA,
    },
    max: 10
};
const client = new pg_1.Pool(config);
function generateCodes() {
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    const size = t.length;
    for (let i = 0; i < 10; i++) {
        let index = Math.floor(Math.random() * size);
        code += t[index];
    }
    return code;
}
function createCodes() {
    return __awaiter(this, void 0, void 0, function* () {
        let code;
        let flag = true;
        do {
            code = generateCodes();
            const result = yield client.query(`select COUNT(*) as count from master_table where code=$1`, [code]);
            if (result.rows[0].count == 0) {
                flag = false;
            }
        } while (flag);
        return code;
    });
}
function createRoute(link) {
    return __awaiter(this, void 0, void 0, function* () {
        let code;
        try {
            yield client.connect();
            // check if code for an url exist or not
            const result = yield client.query(`select code from master_table where url=$1`, [link]);
            if (result.rowCount == 1) {
                return result.rows[0].code;
            }
            code = yield createCodes();
            yield client.query(`insert into master_table(url,code) values ($1,$2)`, [link, code]);
            return code;
        }
        catch (err) {
            console.error(err);
            return "failed";
        }
    });
}
function getLink(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const result = yield client.query(`select url from master_table where code=$1`, [code]);
            let link = result.rows[0].url;
            return link;
        }
        catch (err) {
            console.error(err);
            return "failed";
        }
    });
}
