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
var jwt = require('jsonwebtoken');
var config = {
    server: 'KEVIN',
    host: 'localhost',
    user: 'admsc',
    password: 'Bu7n03Cc',
    port: 1433
};
var pensum = "";
var n = 0;
class cargarCursoRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        /******************* GETS *********************/
        this.router.get('/obtener-cursos', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "SELECT * FROM Pensum";
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
                                res.send(JSON.stringify(recordset.recordsets[0]));
                            }
                            con.close();
                        });
                    });
                }
                catch (Exception) {
                    console.log(Exception);
                }
            });
        });
        this.router.post("/cursos-aprovados", function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(req.body);
                jwt.verify(req.body.token, 'secretkey', (error, authData) => {
                    if (error) {
                        res.sendStatus(403);
                        console.log("como estan");
                    }
                    else {
                        let dataPubli = {
                            cursoNombre: req.body.cursoNombre,
                            nota: req.body.nota,
                            usuario: authData.resp.usuario,
                        };
                        console.log(dataPubli.usuario);
                        try {
                            if ((typeof dataPubli.cursoNombre == 'undefined') || (typeof dataPubli.nota == 'undefined')) {
                                res.send({ mensaje: "Datos incompletos" });
                            }
                            else {
                                var cadena2 = "select idCursoPensum from Pensum where CodigoCurso = 780";
                                var cadena = " insert into CursosAprobados(CarneUsuario, idCursoPen, NotaAprobada) values ('" + dataPubli.usuario + "'"
                                    + ",'" + dataPubli.cursoNombre + "' " + ",' " + dataPubli.nota + "')";
                                var con = new mssql.ConnectionPool(config);
                                con.connect(function (err) {
                                    var req = new mssql.Request(con);
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        req.query(cadena2, function (err, result) {
                                            if (err) {
                                                console.log(n);
                                                console.log(err);
                                            }
                                            else {
                                                n = result.recordset[0].idCursoPensum;
                                            }
                                        });
                                        req.query(cadena, function (err, recordset) {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                res.send(JSON.stringify(recordset));
                                            }
                                            con.close();
                                        });
                                    }
                                });
                            }
                        }
                        catch (error) {
                            console.log("error");
                        }
                    }
                });
            });
        });
    }
}
var cargarCurso = new cargarCursoRouter();
exports.default = cargarCurso.router;
