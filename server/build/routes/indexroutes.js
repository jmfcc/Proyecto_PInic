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
var jwt = require('jsonwebtoken');
var mssql = require('mssql');
var config = {
    server: 'localhost',
    host: 'localhost',
    user: 'admsc',
    password: 'Bu7n03Cc',
    port: 1433
};
class indexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/login', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let resp = req.body;
                    console.log(resp);
                    if ((typeof resp.usuario == 'undefined') || (typeof resp.contrasenia == 'undefined')) {
                        res.send({ mensaje: "Datos incompletos" });
                    }
                    else {
                        var cadena = "select * from Usuario where Carne = " + resp.usuario
                            + " and Contrasenia = '" + resp.contrasenia + "'";
                        var con = new mssql.ConnectionPool(config);
                        con.connect(function (err) {
                            var req = new mssql.Request(con);
                            if (err) {
                                res.send({ "mensaje": "Algo no salio bien" });
                                console.log(err);
                                //return;
                            }
                            req.query(cadena, function (err, recordset) {
                                if (err) {
                                    res.send({ "mensaje": "Algo no salio bien" });
                                    //console.log(err);
                                }
                                else {
                                    //console.log(recordset.recordset)
                                    if (recordset.rowsAffected[0] !== 0) {
                                        const accesToken = jwt.sign({ resp }, 'secretkey', { expiresIn: '10h' });
                                        let dU = recordset.recordset[0];
                                        let dataUser = {
                                            carne: dU.Carne,
                                            nombres: dU.Nombres,
                                            apellidos: dU.Apellidos,
                                            contrasenia: dU.Contrasenia,
                                            correo: dU.Correo,
                                            accesTkn: accesToken,
                                            expiresIn: '10h'
                                        };
                                        let dict = {
                                            dataUser
                                        };
                                        console.log(dict);
                                        res.send(dict);
                                        //res.send(dataUser);
                                    }
                                    else {
                                        res.send({ "mensaje": "Ninguna coincidencia" });
                                    }
                                }
                                con.close();
                            });
                        });
                    }
                    //res.send(resp);
                    //console.log(resp);
                }
                catch (_a) {
                    res.send("Error");
                }
                //let resp = {usuario:'Jaime', contrasen: 12345678};
            });
        });
        //Metodo de prueba para validar el token de autenticacion jwt
        this.router.post('/loggedIn', verifyToken, (req, res) => {
            //jwt.verify(req.token, 'secretkey', (error:any, authData:any)=>{
            jwt.verify(req.body.token, 'secretkey', (error, authData) => {
                if (error) {
                    res.sendStatus(403);
                }
                else {
                    let datauser = {
                        token: req.body.token,
                        usuario: authData.resp.usuario,
                        contrasenia: authData.resp.contrasenia
                    };
                    res.json(datauser);
                }
            });
        });
        // Authorization: Bearer <token>
        function verifyToken(req, res, next) {
            const bearerHeader = req.body.token;
            //const bearerHeader = req.headers['authorization'];
            //console.log(bearerHeader)
            if (typeof bearerHeader !== 'undefined') {
                const bearerToken = bearerHeader.split(" ")[1];
                req.token = bearerToken;
                next();
            }
        }
        this.router.post('/registr', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let resp = req.body;
                    console.log(resp);
                    if ((typeof resp.usuario == 'undefined') || (typeof resp.nombres == 'undefined') || (typeof resp.apellidos == 'undefined') || (typeof resp.contrasenia == 'undefined') || (typeof resp.correo == 'undefined')) {
                        res.send({ mensaje: "Datos incompletos" });
                    }
                    else {
                        var cadena = "insert into Usuario values (" + resp.usuario
                            + ",'" + resp.nombres + "','" + resp.apellidos + "','" + resp.contrasenia + "','" + resp.correo + "');";
                        var con = new mssql.ConnectionPool(config);
                        con.connect(function (err) {
                            var req = new mssql.Request(con);
                            if (err) {
                                console.log(err);
                                return;
                            }
                            req.query(cadena, function (err, recordset) {
                                if (err) {
                                    if (err.number == 2627) {
                                        console.log(err);
                                        res.send({ "mensaje": "#####El usuario ingresado ya esta registrado" });
                                    }
                                    console.log(err);
                                }
                                else {
                                    res.send(JSON.stringify(recordset)); //Puede llevar {mensaje:'Funciona'}
                                }
                                con.close();
                            });
                        });
                    }
                }
                catch (Exception) {
                    res.send({ "mensaje": "El usuario ingresado ya esta registrado" });
                    console.log(Exception);
                }
            });
        });
        //Listado de catedraticos
        this.router.get('/catedraticos', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "select * from catedratico";
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
                catch (Exception) {
                    console.log(Exception);
                }
            });
        });
        //Listado de publicaciones
        this.router.get('/publicaciones', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "select * from publicacion";
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
                catch (Exception) {
                    console.log(Exception);
                }
            });
        });
        //Listado de comentarios
        this.router.get('/comments', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "select * from comentario";
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
                catch (Exception) {
                    console.log(Exception);
                }
            });
        });
        this.router.get('/prueba', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var cadena = "select C.Codigo, C.Nombre, #CCat.Nombres, #CCat.Apellidos"
                        + " from Curso as C, (Select CC.CodigoCurso, #Cat.Nombres, #Cat.Apellidos"
                        + " from CursoCatedratico as CC, (Select id, Nombres, Apellidos"
                        + " from Catedratico where Nombres = 'Darwin Dodany') as #Cat"
                        + " where CC.idCatedratico = #Cat.id) as #CCat"
                        + " where C.Codigo = #CCat.CodigoCurso";
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
                catch (Exception) {
                    console.log(Exception);
                }
            });
        });
    }
}
const indexroutes = new indexRoutes();
exports.default = indexroutes.router;
/*
        this.router.post('/nueva', async function(req,res){
            try{
                let resp=req.body;
                console.log(resp.titulo);
                var cadena = "insert into pelicula values ('"+resp.titulo+"','"+resp.descripcion+"','"+resp.imagen +"');";
                var con = new mssql.ConnectionPool(config);

                con.connect(function(err:any){
                    var req = new mssql.Request(con);
                    if(err){
                        console.log(err);
                        return;
                    }
                    req.query(cadena,function(err:any,recordset:any){
                        if (err){
                            console.log(err);
                        }else{
                            res.send(JSON.stringify(recordset)); //Puede llevar {mensaje:'Funciona'}
                        }
                        con.close();
                    });
                });
            }catch (Exception){
                console.log(Exception);
            }
        });
        this.router.post('/quitar', async function(req,res){
            try{
                let resp=req.body;
                console.log(resp.titulo);
                var cadena = "delete from pelicula where id ="+resp.id+";";
                var con = new mssql.ConnectionPool(config);

                con.connect(function(err:any){
                    var req = new mssql.Request(con);
                    if(err){
                        console.log(err);
                        return;
                    }
                    req.query(cadena,function(err:any,recordset:any){
                        if (err){
                            console.log(err);
                        }else{
                            res.send(JSON.stringify(recordset)); //Puede llevar {mensaje:'Funciona'}
                        }
                        con.close();
                    });
                });
            }catch (Exception){
                console.log(Exception);
            }
        });



*/ 
