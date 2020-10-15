import {Router} from 'express';

class indexRoutes{

    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/init', (req, res)=>{
            res.send('IPC YA VALIO!')
        });
    }
}

const indexroutes = new indexRoutes();
export default indexroutes.router;