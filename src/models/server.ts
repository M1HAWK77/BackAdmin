//to create our API REST
import express, {Application} from 'express';
import cors from 'cors';
//routes
import routesProduct from '../routes/product.routes';
import routesUser from '../routes/user.routes';
import routesCategories from '../routes/category.routes';
import routesSuppliers from '../routes/supplier.routes';
import routesProductRegistration from '../routes/productRegistration.routes'
import routesProductOutput from '../routes/productOutput.routes';
//creation of tables
import {User,Category,DetailOutput,DetailRegistration,Product,ProductOutput,ProductRegistration,Supplier} from './tblAssociation.models';

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
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/categories', routesCategories);
        this.app.use('/api/suppliers', routesSuppliers);
        this.app.use('/api/productRegistration', routesProductRegistration);
        this.app.use('/api/productOutput', routesProductOutput);
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
            await Supplier.sync();
            await Category.sync();
            await Product.sync();
            await ProductRegistration.sync();
            await ProductOutput.sync();
            await DetailRegistration.sync();
            await DetailOutput.sync();

        } catch (error) {
            console.log('unable to connect to the database:',error);
        }
    }

}

export default Server;