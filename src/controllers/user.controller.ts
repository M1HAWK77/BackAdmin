import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.models';

export const newUser=async (req: Request, res:Response) =>{

    /*Destructuring req.body(similar to type req.body.userName), in my json i gonna received
    the params that i need ex. dniUser- nameUser*/
    const {dniUser, nameUser, lastNameUser, userName, passwordUser, userRole}=req.body;
    
    //validate if user exist on the database
    const user= await User.findOne({where: {dniUser: dniUser}});

    if(user){
        return res.status(400).json({
            msg: "The user already exist with that dni"
        })
    }

    console.log("Continue");

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

export const loginUser= async (req: Request, res:Response) =>{

    const {userName, passwordUser} =req.body;

    //validate if user exist on the database, any accept all
    const userExist: any=await User.findOne({where: {userName: userName}});

    if(!userExist){
        return res.status(400).json({
            msg: `We can't find a user with that name ${userName}`
        })
    }

    //validate password
    const passwordValidator= await bcrypt.compare(passwordUser, userExist.passwordUser);
    console.log(passwordValidator);

    if(!passwordValidator){
        return res.status(400).json({
            msg: "Wrong password"
        })
    }

    
    res.json({
        msg: 'Login User',
    });
}

