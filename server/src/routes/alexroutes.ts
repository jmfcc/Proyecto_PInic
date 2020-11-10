import {Router} from 'express';
var mssql = require('mssql');
var jwt = require ('jsonwebtoken');

var config = {
    server: 'localhost', //update me
    database: 'SCUSAC',  // Si hay falla de conexión se especifica la db a usar
    host: 'localhost',
    user: 'sa',   // la base de datos a usar ya esta especificado en la config del usuario
    password: 'base789',
    port: 1433
};

class alexRoutes{

    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        /******************* GETS *********************/
        this.router.get('/obtener-cursos', async function(req,res){
            try{
                var cadena="SELECT * FROM Curso";
                var con = new mssql.ConnectionPool(config);
        
                con.connect(function(err:any){
                var req= new mssql.Request(con);
                    if(err){
                        console.log(err);
                        return;
                    }
                req.query(cadena,function(err:any,recordset:any){
                        if(err){
                            console.log(err);
                        }else{
                            res.send(JSON.stringify(recordset.recordsets[0]));
                        }
                        con.close();
                    });
                });
            }catch(Exception){
                console.log(Exception);
            }
        });

        this.router.get('/obtener-catedraticos', async function(req,res){
            try{
                var cadena="select * from Catedratico";
                var con = new mssql.ConnectionPool(config);
        
                con.connect(function(err:any){
                var req= new mssql.Request(con);
                    if(err){
                        console.log(err);
                        return;
                    }
                req.query(cadena,function(err:any,recordset:any){
                        if(err){
                            console.log(err);
                        }else{
                            res.send(JSON.stringify(recordset.recordsets[0]));
                        }
                        con.close();
                    });
                });
            }catch(Exception){
                console.log(Exception);
            }
        });

        this.router.get('/obtener-curso-catedratico', async function(req,res){
            try{
                var cadena="Select cc.Correlativo, cu.Codigo, cu.Nombre, ca.id, ca.Nombres, ca.Apellidos from CursoCatedratico as cc Inner Join Curso cu on cc.CodigoCurso = cu.Codigo Inner Join Catedratico ca on cc.idCatedratico = ca.id order by cu.Codigo";
                var con = new mssql.ConnectionPool(config);
        
                con.connect(function(err:any){
                var req= new mssql.Request(con);
                    if(err){
                        console.log(err);
                        return;
                    }
                req.query(cadena,function(err:any,recordset:any){
                        if(err){
                            console.log(err);
                        }else{
                            res.send(JSON.stringify(recordset.recordsets[0]));
                        }
                        con.close();
                    });
                });
            }catch(Exception){
                console.log(Exception);
            }
        });

        this.router.get('/obtener-publicaciones', async function(req,res){
            try{
                var cadena="Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id order by pu.Correlativo desc";
                var con = new mssql.ConnectionPool(config);
        
                con.connect(function(err:any){
                var req= new mssql.Request(con);
                    if(err){
                        console.log(err);
                        return;
                    }
                req.query(cadena,function(err:any,recordset:any){
                        if(err){
                            console.log(err);
                        }else{
                            res.send(JSON.stringify(recordset.recordsets[0]));
                        }
                        con.close();
                    });
                });
            }catch(Exception){
                console.log(Exception);
            }
        });

        /******************** POSTS ***************************/
        this.router.post('/crear-publicacion',(req,res)=>{

            jwt.verify(req.body.token, 'secretkey', (error:any, authData:any)=>{
                if(error){
                    res.sendStatus(403);
                }else{
                    let dataPubli ={
                        mensaje: req.body.mensaje,
                        tipo: req.body.tipo,
                        usuario: authData.resp.usuario,
                        codigo: req.body.codigo
                    };
                    var cadena =""
                    if(dataPubli.tipo==1){
                        cadena="INSERT INTO Publicacion(Mensaje, Tipo, Fecha, CarneUsuario,CodigoCurso) VALUES ('"+dataPubli.mensaje+"', "+dataPubli.tipo+", GETDATE(), "+dataPubli.usuario+", "+dataPubli.codigo+")";
                    }else if(dataPubli.tipo==2){
                        cadena="INSERT INTO Publicacion(Mensaje, Tipo, Fecha, CarneUsuario,idCatedratico) VALUES ('"+dataPubli.mensaje+"', "+dataPubli.tipo+", GETDATE(), "+dataPubli.usuario+", "+dataPubli.codigo+")";
                    }else if(dataPubli.tipo==3){
                        cadena="INSERT INTO Publicacion(Mensaje, Tipo, Fecha, CarneUsuario,CorrelCursoCated) VALUES ('"+dataPubli.mensaje+"', "+dataPubli.tipo+", GETDATE(), "+dataPubli.usuario+", "+dataPubli.codigo+")";
                    }

                    try{
                        var con = new mssql.ConnectionPool(config);
                
                        con.connect(function(err:any){
                        var req= new mssql.Request(con);
                            if(err){
                                console.log(err);
                                return;
                            }
                        req.query(cadena,function(err:any,recordset:any){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.send(JSON.stringify(recordset));
                                }
                                con.close();
                            });
                        });
                    }catch(Exception){
                        console.log(Exception);
                    }
                }
            })

        })


        this.router.post('/obtener-comentarios',async function(req,res){
            try{
                let resp={
                    publicacion: req.body.publicacion
                }
                var cadena="select Mensaje as msj, CarneUsuario as carne from Comentario where CorrelPubli = "+resp.publicacion+" order by id desc";
                var con = new mssql.ConnectionPool(config);
        
                con.connect(function(err:any){
                var req= new mssql.Request(con);
                    if(err){
                        console.log(err);
                        return;
                    }
                req.query(cadena,function(err:any,recordset:any){
                        if(err){
                            console.log(err);
                        }else{
                            res.send(JSON.stringify(recordset.recordsets[0]));
                            console.log(JSON.stringify(recordset))
                        }
                        con.close();
                    });
                });
            }catch(Exception){
                console.log(Exception);
            }
        });


        this.router.post('/obtener-publicacion-id', async function(req,res){
            try{
                let resp={
                    publicacion: req.body.publicacion
                }
                var cadena="Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id where pu.Correlativo =  "+resp.publicacion+"";
                var con = new mssql.ConnectionPool(config);
        
                con.connect(function(err:any){
                var req= new mssql.Request(con);
                    if(err){
                        console.log(err);
                        return;
                    }
                req.query(cadena,function(err:any,recordset:any){
                        if(err){
                            console.log(err);
                        }else{
                            res.send(JSON.stringify(recordset.recordsets[0]));
                            console.log(JSON.stringify(recordset))
                        }
                        con.close();
                    });
                });
            }catch(Exception){
                console.log(Exception);
            }
        });

        this.router.post('/crear-comentario',async function(req,res){

            jwt.verify(req.body.token, 'secretkey', (error:any, authData:any)=>{
                if(error){
                    res.sendStatus(403);
                }else{
                    let com ={
                        publicacion: req.body.publicacion,
                        mensaje: req.body.mensaje,
                        usuario: authData.resp.usuario,
                    };

                    try{
                        var cadena = "insert into Comentario(Mensaje, CarneUsuario, CorrelPubli) values ('"+com.mensaje+"',"+com.usuario+","+com.publicacion+")";
                        var con = new mssql.ConnectionPool(config);
                
                        con.connect(function(err:any){
                        var req= new mssql.Request(con);
                            if(err){
                                console.log(err);
                                return;
                            }
                        req.query(cadena,function(err:any,recordset:any){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.send(JSON.stringify(recordset));
                                }
                                con.close();
                            });
                        });
                    }catch(Exception){
                        console.log(Exception);
                    }

                }
            })

        });

    }


}

const alexroutes = new alexRoutes();
export default alexroutes.router;