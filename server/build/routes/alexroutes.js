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
    server: 'localhost',
    host: 'localhost',
    user: 'admsc',
    password: 'Bu7n03Cc',
    port: 1433
};
class alexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        /******************* GETS *********************/
        this.router.get('/obtener-cursos', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "SELECT * FROM Curso";
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
        this.router.get('/obtener-catedraticos', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "select * from Catedratico";
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
        this.router.get('/obtener-curso-catedratico', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "Select cc.Correlativo, cu.Codigo, cu.Nombre, ca.id, ca.Nombres, ca.Apellidos from CursoCatedratico as cc Inner Join Curso cu on cc.CodigoCurso = cu.Codigo Inner Join Catedratico ca on cc.idCatedratico = ca.id order by cu.Codigo";
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
        this.router.get('/obtener-publicaciones', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id order by pu.Correlativo desc";
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
        /******************** POSTS ***************************/
        this.router.post('/crear-publicacion', (req, res) => {
            console.log(req.body);
            jwt.verify(req.body.token, 'secretkey', (error, authData) => {
                if (error) {
                    res.sendStatus(403);
                }
                else {
                    let dataPubli = {
                        mensaje: req.body.mensaje,
                        tipo: req.body.tipo,
                        usuario: authData.resp.usuario,
                        codigo: req.body.codigo
                    };
                    console.log(dataPubli.usuario);
                    var cadena = "";
                    if (dataPubli.tipo == 1) {
                        cadena = "INSERT INTO Publicacion(Mensaje, Tipo, Fecha, CarneUsuario,CodigoCurso) VALUES ('" + dataPubli.mensaje + "', " + dataPubli.tipo + ", GETDATE(), " + dataPubli.usuario + ", " + dataPubli.codigo + ")";
                    }
                    else if (dataPubli.tipo == 2) {
                        cadena = "INSERT INTO Publicacion(Mensaje, Tipo, Fecha, CarneUsuario,idCatedratico) VALUES ('" + dataPubli.mensaje + "', " + dataPubli.tipo + ", GETDATE(), " + dataPubli.usuario + ", " + dataPubli.codigo + ")";
                    }
                    else if (dataPubli.tipo == 3) {
                        cadena = "INSERT INTO Publicacion(Mensaje, Tipo, Fecha, CarneUsuario,CorrelCursoCated) VALUES ('" + dataPubli.mensaje + "', " + dataPubli.tipo + ", GETDATE(), " + dataPubli.usuario + ", " + dataPubli.codigo + ")";
                    }
                    try {
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
                                    res.send(JSON.stringify(recordset));
                                }
                                con.close();
                            });
                        });
                    }
                    catch (Exception) {
                        console.log(Exception);
                    }
                }
            });
        });
        this.router.post('/obtener-comentarios', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let resp = {
                        publicacion: req.body.publicacion
                    };
                    var cadena = "select Mensaje as msj, CarneUsuario as carne from Comentario where CorrelPubli = " + resp.publicacion + " order by id desc";
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
                                console.log(JSON.stringify(recordset));
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
        this.router.post('/obtener-publicacion-id', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let resp = {
                        publicacion: req.body.publicacion
                    };
                    var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id where pu.Correlativo =  " + resp.publicacion + "";
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
                                console.log(JSON.stringify(recordset));
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
        this.router.post('/crear-comentario', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                jwt.verify(req.body.token, 'secretkey', (error, authData) => {
                    if (error) {
                        res.sendStatus(403);
                    }
                    else {
                        let com = {
                            publicacion: req.body.publicacion,
                            mensaje: req.body.mensaje,
                            usuario: authData.resp.usuario,
                        };
                        try {
                            var cadena = "insert into Comentario(Mensaje, CarneUsuario, CorrelPubli) values ('" + com.mensaje + "'," + com.usuario + "," + com.publicacion + ")";
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
                                        res.send(JSON.stringify(recordset));
                                    }
                                    con.close();
                                });
                            });
                        }
                        catch (Exception) {
                            console.log(Exception);
                        }
                    }
                });
            });
        });
        /***************Rutas de Pau y moi XD****************/
        this.router.post('/obtener-perfil', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let resp = {
                        carnet: req.body.Carnet
                    };
                    var cadena = "SELECT Carne, Nombres, Apellidos, Correo FROM Usuario WHERE Carne=" + resp.carnet;
                    var con = new mssql.ConnectionPool(config);
                    //AGREGADO POR KEVIN__CONTRERAS
                    var cadena3 = "select Usuario.Carne, Curso.Nombre,Pensum.Creditos, CursosAprobados.NotaAprobada from Curso join Pensum on Pensum.CodigoCurso = Curso.Codigo join CursosAprobados on Pensum.idCursoPensum = CursosAprobados.idCursoPen join Usuario on CursosAprobados.CarneUsuario = Usuario.Carne where Usuario.Carne =" + "'" + resp.carnet + "'";
                    //----------------------------------------------------------
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
                                console.log(JSON.stringify(recordset));
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
        this.router.post('/modificar-perfil', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let resp = {
                        carnet: req.body.Carnet,
                        nombre: req.body.Nombre,
                        apellido: req.body.Apellido,
                        correo: req.body.Correo
                    };
                    var cadena = "UPDATE Usuario SET Correo='" + resp.correo + "', Nombres='" + resp.nombre + "',Apellidos='" + resp.apellido + "' WHERE Carne=" + resp.carnet;
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
                                res.send(JSON.stringify('LISTO!'));
                                console.log(JSON.stringify(recordset));
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
        this.router.post("/curso-realizados", function (req, res) {
            var cadena3 = "select Usuario.Carne, Curso.Nombre,Pensum.Creditos, CursosAprobados.NotaAprobada from Curso join Pensum on Pensum.CodigoCurso = Curso.Codigo join CursosAprobados on Pensum.idCursoPensum = CursosAprobados.idCursoPen join Usuario on CursosAprobados.CarneUsuario = Usuario.Carne where Usuario.Carne =" + "'" + req.body.Carnet + "'";
            var con = new mssql.ConnectionPool(config);
            con.connect(function (err) {
                var req = new mssql.Request(con);
                if (err) {
                    console.log(err);
                    return;
                }
                req.query(cadena3, function (err, recordset) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send(JSON.stringify(recordset));
                    }
                    con.close();
                });
            });
        });
    }
}
const alexroutes = new alexRoutes();
exports.default = alexroutes.router;
