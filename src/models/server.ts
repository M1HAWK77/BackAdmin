//to create our API REST
import express, {Application} from 'express';
import cors from 'cors';
//routes
import routesUser from '../routes/user.routes';
//creation of tables
import {User} from './user.models';

class Server{

    private app: Application;
    private port:String;

    constructor(){
        this.app=express();
        this.port=process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    //@app.listen(): initialize the web server on the specified port 
    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Application is running in port ${this.port}`);
        })
    }

    //@routes: configurate routes
    routes(){
        this.app.use('/api/users', routesUser);
    }

    /*@middlewares: check http request from server,
    if body is in json convert data to js object*/
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    /*@dbConnect: Asynchronous function that creates the database based on
    sequel rules*/
    async dbConnect(){
        try {
            //These lines of code the first time create my tables
            await User.sync();

        } catch (error) {
            console.log('unable to connect to the database:',error);
        }
    }

}

export default Server;