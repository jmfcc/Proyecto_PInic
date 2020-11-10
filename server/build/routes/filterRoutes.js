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
const express_1 = require("express");
var mssql = require('mssql');
var config = {
    server: 'localhost',
    database: 'SCUSAC',
    host: 'localhost',
    user: 'sa',
    password: 'base789',
    port: 1433
};
class filterRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //http://localhost:3000/filtro/por-curso/14
        this.router.get('/por-curso/:id', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { id } = req.params;
                    var cadena = "select * from Publicacion where CodigoCurso=" + id;
                    var con = new mssql.ConnectionPool(config);
                    con.connect(function (err) {
                        var req = new mssql.Request(con);
                        if (err) {
                            console.log(err);
                            return;
                        }
                        req.query(cadena, function (err, recordset) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.send(JSON.stringify(recordset.recordset)); //quizas por ser un serv v2012 necesita recordset.recordset[0]
                            }
                            con.close();
                        });
                    });
                }
                catch (error) {
                    res.send("Error" + error);
                }
            });
        });
        //http://localhost:3000/filtro/por-catedratico/1
        this.router.get('/por-catedratico/:id', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { id } = req.params;
                    var cadena = "select * from Publicacion where idCatedratico=" + id;
                    var con = new mssql.ConnectionPool(config);
                    con.connect(function (err) {
                        var req = new mssql.Request(con);
                        if (err) {
                            console.log(err);
                            return;
                        }
                        req.query(cadena, function (err, recordset) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.send(JSON.stringify(recordset.recordset)); //quizas por ser un serv v2012 necesita recordset.recordset[0]
                            }
                            con.close();
                        });
                    });
                }
                catch (error) {
                    res.send("Error" + error);
                }
            });
        });
        //http://localhost:3000/filtro/por-fecha
        this.router.get('/por-fecha', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "select * from Publicacion Order by Fecha DESC";
                    var con = new mssql.ConnectionPool(config);
                    con.connect(function (err) {
                        var req = new mssql.Request(con);
                        if (err) {
                            console.log(err);
                            return;
                        }
                        req.query(cadena, function (err, recordset) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.send(JSON.stringify(recordset.recordset)); //quizas por ser un serv v2012 necesita recordset.recordset[0]
                            }
                            con.close();
                        });
                    });
                }
                catch (error) {
                    res.send("Error" + error);
                }
            });
        });
        //http://localhost:3000/filtro/por-catedratico
        this.router.get('/por-catedratico', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "select * from Publicacion Order by idCatedratico DESC";
                    var con = new mssql.ConnectionPool(config);
                    con.connect(function (err) {
                        var req = new mssql.Request(con);
                        if (err) {
                            console.log(err);
                            return;
                        }
                        req.query(cadena, function (err, recordset) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.send(JSON.stringify(recordset.recordset)); //quizas por ser un serv v2012 necesita recordset.recordset[0]
                            }
                            con.close();
                        });
                    });
                }
                catch (error) {
                    res.send("Error" + error);
                }
            });
        });
        //http://localhost:3000/filtro/por-curso
        this.router.get('/por-curso', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "select * from Publicacion Order by CodigoCurso DESC";
                    var con = new mssql.ConnectionPool(config);
                    con.connect(function (err) {
                        var req = new mssql.Request(con);
                        if (err) {
                            console.log(err);
                            return;
                        }
                        req.query(cadena, function (err, recordset) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.send(JSON.stringify(recordset.recordset)); //quizas por ser un serv v2012 necesita recordset.recordset[0]
                            }
                            con.close();
                        });
                    });
                }
                catch (error) {
                    res.send("Error" + error);
                }
            });
        });
    }
}
const filterroutes = new filterRoutes();
exports.default = filterroutes.router;
