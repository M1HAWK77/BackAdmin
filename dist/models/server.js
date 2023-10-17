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
//routes
const product_routes_1 = __importDefault(require("../routes/product.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const category_routes_1 = __importDefault(require("../routes/category.routes"));
const supplier_routes_1 = __importDefault(require("../routes/supplier.routes"));
const category_models_1 = require("./category.models");
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
        this.app.use('/api/products', product_routes_1.default);
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/categories', category_routes_1.default);
        this.app.use('/api/suppliers', supplier_routes_1.default);
    }
    /*@middlewares: check http request from server,
    if body is in json convert data to js object*/
    middlewares() {
        this.app.use(express_1.default.json());
    }
    /*@dbConnect: Asynchronous function that creates the database based on
    sequel rules*/
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield category_models_1.Category.sync();
            }
            catch (error) {
                console.log('unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
