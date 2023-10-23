import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.models';

export const newUser=async (req: Request, res:Response) =>{

    /*Destructuring req.body(similar to type req.body.userName), in my json i gonna received
    the params that i need ex. dniUser- nameUser*/
    const {dniUser, nameUser, lastNameUser, userName, passwordUser, userRole}=req.body;
    
    //Encrypt password
    const hashedPassword=await bcrypt.hash(passwordUser, 10);

    try {
        //Save data in the database
        await User.create({
            dniUser:dniUser, 
            nameUser:nameUser,
            lastNameUser:lastNameUser,
            userName:userName, 
            passwordUser:hashedPassword,
            userRole: userRole
        });
    
        res.json({
            msg: `User ${nameUser} ${lastNameUser} created successfully!`
        });
    } catch (error) {
        res.status(400).json({
            msg:"An error has ocurred",
            error
        })
    }
}

export const loginUser= (req: Request, res:Response) =>{
    const {body}=req;

    res.json({
        msg: 'Login User',
        body
    });
}

