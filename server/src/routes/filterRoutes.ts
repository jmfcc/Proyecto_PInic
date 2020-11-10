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

                var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  where pu.CodigoCurso="+id;
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

                var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  where pu.idCatedratico="+id;
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

                var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  order by pu.Fecha DESC";
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

                var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  order by pu.idCatedratico DESC";
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

                var cadena = "Select pu.Correlativo as id, pu.Mensaje as msj ,pu.CarneUsuario as usuario ,Format(pu.Fecha, 'dd-MM-yyyy') as fecha, cu.Codigo as codCurso, cu.Nombre as Curso, ca.Nombres as catNombre, ca.Apellidos as catApellid from Publicacion as pu Left Join CursoCatedratico cc on pu.CorrelCursoCated = cc.Correlativo  Left Join Curso cu on cc.CodigoCurso = cu.Codigo or pu.CodigoCurso = cu.Codigo Left Join Catedratico ca on cc.idCatedratico = ca.id or pu.idCatedratico = ca.id  order by pu.CodigoCurso DESC";
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