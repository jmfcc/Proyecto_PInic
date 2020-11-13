import {Router} from 'express';
import { Int } from 'mssql';
var mssql = require('mssql');
var jwt = require ('jsonwebtoken');
var config = {
  server: 'KEVIN',
  host: 'localhost',
  user: 'admsc', //'alexwgd', //Este debe ser su usuario
  password: 'Bu7n03Cc', //'1234', // Esta debe ser su contraseña
  port: 1433
};
var pensum="";
var n=0
class cargarCursoRouter{

  public router:Router=Router();

  constructor(){
      this.config();
  }
  
  config():void{
    /******************* GETS *********************/
    this.router.get('/obtener-cursos', async function(req,res){
        try{
            var cadena="SELECT * FROM Pensum";
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

    this.router.post("/cursos-aprovados",async function(req,res){
        console.log(req.body)
        jwt.verify(req.body.token, 'secretkey', (error:any, authData:any)=>{
            if(error){
                res.sendStatus(403);
                console.log("como estan")
            }else{
                let dataPubli ={
                    cursoNombre: req.body.cursoNombre,
                    nota: req.body.nota,
                    usuario: authData.resp.usuario,
                    
                };
                console.log(dataPubli.usuario)
        try {
            
            if ((typeof dataPubli.cursoNombre == 'undefined') || (typeof dataPubli.nota == 'undefined') ){
                res.send({mensaje:"Datos incompletos"})
                
            }else{
                var cadena2 = "select idCursoPensum from Pensum where CodigoCurso = 780"
                var cadena = " insert into CursosAprobados(CarneUsuario, idCursoPen, NotaAprobada) values ('"+dataPubli.usuario+"'"
                    +",'"+dataPubli.cursoNombre+"' "+",' "+dataPubli.nota+"')";
               
    
                var con = new mssql.ConnectionPool(config);
               
                con.connect(function(err:any){
                    var req = new mssql.Request(con);
                    
                    if(err){
                        console.log(err)
                    
                    }else{
                        req.query(cadena2,function(err:any,result:any){
                            if(err){
                                console.log(n)
                                console.log(err)
                            }else{
                                
                                 
                                 n = result.recordset[0].idCursoPensum
                                 
                            }
                        })
                        req.query(cadena,function(err:any,recordset:any){
                            if(err){
                                console.log(err)
                            }else{
                                res.send(JSON.stringify(recordset));
                                
                            }
                            con.close();
                        })

                        
                    }


                })
            }
                    
        }catch (error) {
        console.log("error")
        }
    
            }
        })
    })
  }
  
}
var cargarCurso = new cargarCursoRouter()
export default cargarCurso.router;