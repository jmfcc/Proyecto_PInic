import express, {Application} from 'express';
import indexroutes from './routes/indexroutes';


class server{

    public app:Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port', process.env.PORT || 3000);
    }
    routes():void{
        this.app.use('/sys', indexroutes)
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('servidor en el puerto: ', this.app.get('port'));
        });
    }

}

const servidor = new server();
servidor.start();