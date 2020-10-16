import {Router} from 'express';
var mssql = require('mssql');

var config = {
    server: 'localhost', //update me
    //database: 'PELICULAS',  // Si hay falla de conexión se especifica la db a usar
    host: 'localhost',
    user: 'admsc',   // la base de datos a usar ya esta especificado en la config del usuario
    password: 'Bu7n03Cc',
    port: 1433
};

class indexRoutes{
    
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        
        this.router.get('/catedraticos', async function(req,res){
            try{
                var cadena = "select * from catedratico";
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
                            res.send(JSON.stringify(recordset.recordset)); //quizas por ser un serv v2012 necesita recordset.recordset[0]
                        }
                        con.close();
                    });
                });
            }catch (Exception){
                console.log(Exception);
            }
        });

        this.router.get('/prueba', async function(req,res){
            try{
                var cadena = "select C.Codigo, C.Nombre, #CCat.Nombres, #CCat.Apellidos"
                + " from Curso as C, (Select CC.CodigoCurso, #Cat.Nombres, #Cat.Apellidos"
                + " from CursoCatedratico as CC, (Select id, Nombres, Apellidos" 
                + " from Catedratico where Nombres = 'Darwin Dodany') as #Cat" 
                + " where CC.idCatedratico = #Cat.id) as #CCat"
                + " where C.Codigo = #CCat.CodigoCurso";
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
                            res.send(JSON.stringify(recordset.recordset)); //quizas por ser un serv v2012 necesita recordset.recordset[0]
                        }
                        con.close();
                    });
                });
            }catch (Exception){
                console.log(Exception);
            }
        });
    }
}

const indexroutes = new indexRoutes();
export default indexroutes.router;

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