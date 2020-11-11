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
                    var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  where pu.CodigoCurso=" + id;
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
                    var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  where pu.idCatedratico=" + id;
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
        //http://localhost:3000/filtro/por-CursoCatedratico/1
        this.router.get('/por-CursoCatedratico/:id', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { id } = req.params;
                    var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  where pu.CorrelCursoCated=" + id;
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
                    var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  order by pu.Fecha DESC";
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
                    var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  order by pu.idCatedratico DESC";
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
                    var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  order by pu.CodigoCurso DESC";
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
        //http://localhost:3000/filtro/por-CursoCatedratico
        this.router.get('/por-CursoCatedratico', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  order by CorrelCursoCated DESC";
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
