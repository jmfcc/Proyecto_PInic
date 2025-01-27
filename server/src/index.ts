import express, {Application} from 'express';
import indexroutes from './routes/indexroutes';
import userRoutes from './routes/userRoutes';
import alexroutes from './routes/alexroutes';
import filtterRoutes from './routes/filterRoutes';
import cargar from './routes/cargarCursoRouter'

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
        this.app.use('/sys/user', userRoutes)
        
        this.app.use('/alex',alexroutes)
        this.app.use('/filtro',filtterRoutes)
        this.app.use('/kevin',cargar)
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('servidor en el puerto: ', this.app.get('port'));
        });
    }

}

const servidor = new server();
servidor.start();