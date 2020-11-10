import {Router} from 'express';
var mssql =require('mssql');

var config = {  
    server: 'localhost', //update me
    database: 'SCUSAC',  // Si hay falla de conexión se especifica la db a usar
    host: 'localhost',
    user: 'sa',   // la base de datos a usar ya esta especificado en la config del usuario
    password: 'base789',
    port: 1433
};  

class filterRoutes{

    public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{


        //http://localhost:3000/filtro/por-curso/14

        this.router.get('/por-curso/:id', async function (req,res){

            try {

                const { id } = req.params;

                var cadena = "select * from Publicacion where CodigoCurso="+id;
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
                
            } catch (error) {
                res.send("Error" + error);
            }
        });


        //http://localhost:3000/filtro/por-catedratico/1

        this.router.get('/por-catedratico/:id', async function (req,res){

            try {

                const { id } = req.params;

                var cadena = "select * from Publicacion where idCatedratico="+id;
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
                
            } catch (error) {
                res.send("Error" + error);
            }
        });

        //http://localhost:3000/filtro/por-fecha

        this.router.get('/por-fecha', async function (req,res){

            try {

                var cadena = "select * from Publicacion Order by Fecha DESC";
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
                
            } catch (error) {
                res.send("Error" + error);
            }
        });

        //http://localhost:3000/filtro/por-catedratico

        this.router.get('/por-catedratico', async function (req,res){

            try {

                var cadena = "select * from Publicacion Order by idCatedratico DESC";
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
                
            } catch (error) {
                res.send("Error" + error);
            }
        });


        //http://localhost:3000/filtro/por-curso

        this.router.get('/por-curso', async function (req,res){

            try {

                var cadena = "select * from Publicacion Order by CodigoCurso DESC";
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
                
            } catch (error) {
                res.send("Error" + error);
            }
        });

    }
}

const filterroutes = new filterRoutes();
export default filterroutes.router;