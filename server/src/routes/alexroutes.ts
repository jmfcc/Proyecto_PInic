import {Router} from 'express';
var mssql = require('mssql');

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
        this.router.get('/holamundo',(req,res)=>{
            res.send("hola mundo");
        })
    }

}

const alexroutes = new alexRoutes();
export default alexroutes.router;