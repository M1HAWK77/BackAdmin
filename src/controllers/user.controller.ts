import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.models';
import jwt from 'jsonwebtoken';
import { ErrorMessages } from '../error/manage.error';

export const newUser=async (req: Request, res:Response) =>{

    /*Destructuring req.body(similar to type req.body.userName), in my json i gonna received
    the params that i need ex. dniUser- nameUser*/
    const {dniUser, nameUser, lastNameUser, userName, passwordUser, userRole}=req.body;
    
    //validate if user exist on the database
    const user= await User.findOne({where: {dniUser: dniUser}});


    if(user){
        return res.status(409).json({
            msg: ErrorMessages.USER_EXIST
        })
    }

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
        res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
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

    console.log(passwordUser);
    console.log(userExist.passwordUser);
    //validate password
                                        //return true or false
    const passwordValidator= await bcrypt.compare(passwordUser, userExist.passwordUser);
    console.log(passwordValidator);

    if(!passwordValidator){
        return res.status(400).json({
            msg: ErrorMessages.WRONG_PASS
        })
    }

    //generate token 
    const token=jwt.sign({
        userName: userName
    },process.env.SECRET_KEY || 'randomPasswordGenerator345')

    res.json(token);
}


export const getUsers = async (req: Request, res: Response) => {
    try {
        const usersList = await User.findAll();
        res.json({
            usersList
        })

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR
        })
    }
}


export const deleteUser= async(req:Request, res:Response)=>{
    const idUser= req.params.id;
    const existUser:any= await User.findOne({where:{dniUser: idUser}});

    if(!existUser){
        return res.status(404).json({
            msg:ErrorMessages.USER_EXIST
        })
    }

    try {
        await User.destroy(
            {where:{dniUser:idUser}}
        );
        
        res.json({
            msg:`The user ${existUser.nameUser} ${existUser.lastNameUser} was deleted succesfully`
        })

    } catch (error) {
        return res.status(500).json({
            msg:ErrorMessages.SERVER_ERROR,
            error
        })
    }


}

export const updateUser = async (req: Request, res: Response) => {

    const idUser = req.params.id;
    const { nameUser, lastNameUser, userName} = req.body;

    const existUser:any = await User.findOne({ where: { dniUser: idUser } });

    if (!existUser) {
        return res.status(404).json({
            msg: ErrorMessages.SUP_NOT_FOUND
        });
    }

    try {
        await User.update(
            {
                nameUser: nameUser,
                lastNameUser: lastNameUser,
                userName: userName,
            }, 
            {where:{dniUser:idUser}}
        );

        res.json({
                msg: `The User ${existUser.nameUser} was edited succefully`
            });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}

