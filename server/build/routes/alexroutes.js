"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var mssql = require('mssql');
var config = {
    server: 'localhost',
    host: 'localhost',
    user: 'alexwgd',
    password: '1234',
    port: 1433
};
class alexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/holamundo', (req, res) => {
            res.send("hola mundo");
        });
    }
}
const alexroutes = new alexRoutes();
exports.default = alexroutes.router;
