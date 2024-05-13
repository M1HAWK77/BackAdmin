"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//to create our API REST
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//routes
const user_routes_1 = __importDefault(require("../routes/user.routes"));
//creation of tables
const user_models_1 = require("./user.models");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    //@app.listen(): initialize the web server on the specified port 
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application is running in port ${this.port}`);
        });
    }
    //@routes: configurate routes
    routes() {
        this.app.use('/api/users', user_routes_1.default);
    }
    /*@middlewares: check http request from server,
    if body is in json convert data to js object*/
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    /*@dbConnect: Asynchronous function that creates the database based on
    sequel rules*/
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //These lines of code the first time create my tables
                yield user_models_1.User.sync();
            }
            catch (error) {
                console.log('unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
