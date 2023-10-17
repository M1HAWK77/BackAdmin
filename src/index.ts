import dotenv from 'dotenv';
import  Server from "./models/server";

//@dotenv: configuration dotenv to could see the PORT
dotenv.config();


const server=new Server();