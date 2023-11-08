import {Request, Response, NextFunction} from 'express';
import { ErrorMessages } from '../error/manage.error';
import jwt from 'jsonwebtoken';


//File created to validate token
const validateToken= (req: Request, res: Response, mustContinue: NextFunction) =>{
    console.log('validate token');
    //receive header with the token
    const headerToken= req.headers['authorization'];

    if(headerToken != undefined && headerToken.startsWith('Bearer')){

        try {
            //contains token
            const bearerToken = headerToken.slice(7);
            //Verify if token is valid
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'randomPasswordGenerator345');
            
        } catch (error) {
            res.status(401).json({
                msg: ErrorMessages.WRONG_TOKEN,
                error
            })
        }
        
        //variable i use as parameter, i use this to know if i have access to the other routes
        mustContinue();
    }else{
        res.status(401).json({
            msg: ErrorMessages.UNAUTHORIZED
        })
    }
}

export default validateToken;