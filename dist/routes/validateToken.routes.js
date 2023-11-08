"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const manage_error_1 = require("../error/manage.error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//File created to validate token
const validateToken = (req, res, mustContinue) => {
    console.log('validate token');
    //receive header with the token
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        try {
            //contains token
            const bearerToken = headerToken.slice(7);
            //Verify if token is valid
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'randomPasswordGenerator345');
        }
        catch (error) {
            res.status(401).json({
                msg: manage_error_1.ErrorMessages.WRONG_TOKEN,
                error
            });
        }
        //variable i use as parameter, i use this to know if i have access to the other routes
        mustContinue();
    }
    else {
        res.status(401).json({
            msg: manage_error_1.ErrorMessages.UNAUTHORIZED
        });
    }
};
exports.default = validateToken;
