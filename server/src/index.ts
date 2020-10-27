import express, {Application} from 'express';
import indexroutes from './routes/indexroutes';
import alexroutes from './routes/alexroutes';

import morgan from 'morgan';
import cors from 'cors';

class server{

    public app:Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }
    routes():void{
        this.app.use('/sys', indexroutes)
        this.app.use('/alex',alexroutes)
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('servidor en el puerto: ', this.app.get('port'));
        });
    }

}

const servidor = new server();
servidor.start();