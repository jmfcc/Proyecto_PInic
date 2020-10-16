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
    //database: 'PELICULAS',  // Si hay falla de conexión se especifica la db a usar
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
