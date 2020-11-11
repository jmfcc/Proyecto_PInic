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
    host: 'localhost',
    user: 'admsc',
    password: 'Bu7n03Cc',
    port: 1433
};
class userRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/verificar', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let datos = req.body;
                    if ((typeof datos.usuario == 'undefined') || (typeof datos.correo == 'undefined')) {
                        res.send({ mensaje: "Datos incompletos" }); //aunque esto se puede validar del lado del servidor
                    }
                    else {
                        var cadena = "select * from Usuario where Carne = " + datos.usuario
                            + " and correo = '" + datos.correo + "'";
                        var con = new mssql.ConnectionPool(config); //para la conexion con la db
                        con.connect(function (err) {
                            var req = new mssql.Request(con);
                            if (err) {
                                res.send({ "mensaje": "Algo no salio bien", "error": err });
                            }
                            req.query(cadena, function (err, recordset) {
                                if (err) {
                                    res.send({ "mensaje": "Algo no salio bien", "error": err });
                                }
                                else {
                                    if (recordset.rowsAffected[0] !== 0) {
                                        // res.sendStatus(403);
                                        res.send({ "mensaje": "si se puede cambiar la contraseña", "usuario": JSON.stringify(recordset) });
                                    }
                                    else {
                                        res.sendStatus(404);
                                        // res.send({"mensaje":"usuario no encontrado"});
                                    }
                                }
                                con.close();
                            });
                        });
                    }
                }
                catch (error) {
                    res.send("Error" + error);
                }
            });
        });
        this.router.post('/actualizarContrasenia', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let datos = req.body;
                    if ((typeof datos.usuario == 'undefined') || (typeof datos.contrasenia == 'undefined')) {
                        res.send({ mensaje: "Datos incompletos" }); //aunque esto se puede validar del lado del servidor
                    }
                    else {
                        var cadena = "update Usuario set Contrasenia = '" + datos.contrasenia
                            + "' where Carne = " + datos.usuario;
                        var con = new mssql.ConnectionPool(config); //para la conexion con la db
                        con.connect(function (err) {
                            var req = new mssql.Request(con);
                            if (err) {
                                res.send({ "mensaje": "Algo no salio bien", "error": err });
                            }
                            req.query(cadena, function (err, recordset) {
                                if (err) {
                                    // res.send({"mensaje": "Algo no salio bien", "error": err})
                                }
                                else {
                                    // res.sendStatus(403);
                                    res.send({ "mensaje": "se ha actualizado la contrasenia", "usuario": JSON.stringify(recordset) });
                                }
                                con.close();
                            });
                        });
                    }
                }
                catch (error) {
                    res.send("Error" + error);
                }
            });
        });
    }
}
const userroutes = new userRoutes();
exports.default = userroutes.router;
