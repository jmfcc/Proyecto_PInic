"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class indexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/init', (req, res) => {
            res.send('IPC YA VALIO!');
        });
    }
}
const indexroutes = new indexRoutes();
exports.default = indexroutes.router;
