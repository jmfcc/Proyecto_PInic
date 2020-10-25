import {Router} from 'express';
var mssql = require('mssql');
var jwt = require ('jsonwebtoken');

var config = {
    server: 'localhost',
    host: 'localhost',
    user: 'alexwgd', //Este debe ser su usuario
    password: '1234', // Esta debe ser su contraseña
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
                var cadena="Select  pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha,cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id order by pu.Fecha desc";
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
        this.router.post('/nueva-publicacion', verifyToken, async function name(req, res) {

            jwt.verify(req.body.token, 'secretkey', (error:any, authData:any)=>{
                if (error){
                    res.sendStatus(403);
                }else{
                    let datauser = {
                        token : req.body.token,
                        usuario: authData.resp.usuario,
                        contrasenia: authData.resp.contrasenia
                    };
                    
                    try {

                        
                    } catch (error) {
                        console.log(error);
                    }


                }
            });

        })

        function verifyToken(req:any,res:any,next:any){ //depende del formato de envio del front
            const bearerHeader = req.body.token;
            if (typeof bearerHeader !== 'undefined'){
                const bearerToken = bearerHeader.split(" ")[1];
                req.token = bearerToken;
                next();
            }
        }

    }

}

const alexroutes = new alexRoutes();
export default alexroutes.router;