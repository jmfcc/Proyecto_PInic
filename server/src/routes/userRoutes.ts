import {Router} from 'express';
var mssql =require('mssql');

var config = {  
    server: 'localhost',
    host: 'localhost',
    user: 'admsc', //'alexwgd', //Este debe ser su usuario
    password: 'Bu7n03Cc', //'1234', // Esta debe ser su contraseña
    port: 1433
};  


class userRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.post('/verificar', async function (req,res){

            try {
                let datos=req.body;

                if ((typeof datos.usuario == 'undefined') || (typeof datos.correo == 'undefined')){
                    
                    res.send({mensaje:"Datos incompletos"}) //aunque esto se puede validar del lado del servidor
                }else{
                    var cadena = "select * from Usuario where Carne = "+datos.usuario
                    +" and correo = '"+datos.correo+"'";


                    var con = new mssql.ConnectionPool(config); //para la conexion con la db

                    con.connect(function(err:any){
                        var req = new mssql.Request(con);
                        if(err){ 
                            res.send({"mensaje": "Algo no salio bien", "error": err})
                            
                        }
                        req.query(cadena,function(err:any,recordset:any){
                            if (err){
                                res.send({"mensaje": "Algo no salio bien", "error": err})
                            }else{
                                if(recordset.rowsAffected[0] !== 0){

                                    // res.sendStatus(403);
                                     res.send({"mensaje":"si se puede cambiar la contraseña", "usuario":JSON.stringify(recordset)});
                                }else{
                                    res.sendStatus(404)
                                   // res.send({"mensaje":"usuario no encontrado"});
                                }
                            }
                            con.close();
                        });
                    });
                }
            } catch (error) {
                res.send("Error" + error);
            }
        });

        this.router.post('/actualizarContrasenia', async function (req,res){

            try {
                let datos=req.body;

                if ((typeof datos.usuario == 'undefined') || (typeof datos.contrasenia == 'undefined')){
                    
                    res.send({mensaje:"Datos incompletos"}) //aunque esto se puede validar del lado del servidor
                }else{
                    var cadena = "update Usuario set Contrasenia = '"+datos.contrasenia
                    +"' where Carne = "+datos.usuario;


                    var con = new mssql.ConnectionPool(config); //para la conexion con la db

                    con.connect(function(err:any){
                        var req = new mssql.Request(con);
                        if(err){ 
                            res.send({"mensaje": "Algo no salio bien", "error": err})
                            
                        }
                        req.query(cadena,function(err:any,recordset:any){
                            if (err){
                               // res.send({"mensaje": "Algo no salio bien", "error": err})
                            }else{
                               // res.sendStatus(403);
                                res.send({"mensaje":"se ha actualizado la contrasenia", "usuario":JSON.stringify(recordset)});
                            }
                            con.close();
                        });
                    });
                }
            } catch (error) {
                res.send("Error" + error);
            }
        });
    }
}

const userroutes = new userRoutes();
export default userroutes.router;
