"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexroutes_1 = __importDefault(require("./routes/indexroutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const alexroutes_1 = __importDefault(require("./routes/alexroutes"));
const filterRoutes_1 = __importDefault(require("./routes/filterRoutes"));
const cargarCursoRouter_1 = __importDefault(require("./routes/cargarCursoRouter"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/sys', indexroutes_1.default);
        this.app.use('/sys/user', userRoutes_1.default);
        this.app.use('/alex', alexroutes_1.default);
        this.app.use('/filtro', filterRoutes_1.default);
        this.app.use('/kevin', cargarCursoRouter_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('servidor en el puerto: ', this.app.get('port'));
        });
    }
}
const servidor = new server();
servidor.start();
