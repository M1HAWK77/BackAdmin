// Importa la biblioteca Chai y los estilos de aserción que deseas utilizar
import { expect } from 'chai';
// Importa la función que deseas probar
import { loginUser } from '../controllers/user.controller';
//para hacer las pruebas del login 
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.models';
import httpMocks from 'node-mocks-http';
import { Request, Response } from 'express';

//Indicamos que usamos http

//Describo el grupo de pruebas
describe('Api-login', () => {

    it('Debe devolver true cuando se hayan identificado las credenciales, y se verifique el token', async () => {
        let userInput = 'ariel'
        let passwordInput = '123'
        //Datos en formato json
        const req: Request = httpMocks.createRequest({
            method: 'POST',
            url: 'http://localhost:3001/api/users/userLogin',
            body: {
                userName: userInput,
                passwordUser: passwordInput
            }
        });
        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();
        const userExist: any = await User.findOne({ where: { userName: userInput } });
        bcrypt.compare(passwordInput, userExist.passwordUser);

        const token = jwt.sign({
            userName: userInput
        }, process.env.SECRET_KEY || 'randomPasswordGenerator345')

        await loginUser(req, res);
        expect(res.statusCode).to.equal(200);
        expect(token).to.exist;
    });

    // Define otra prueba  
    it('Retorna false ya que la contraseña no coincide', async () => {
        let userInput = 'ariel'
        let passwordInput = '1234'

        const userExist: any = await User.findOne({ where: { userName: userInput } });
        const comparePassword = await bcrypt.compare(passwordInput, userExist.passwordUser);
        expect(comparePassword).to.be.false;
    });

    // Define otra prueba  
    it('Retorna false ya que el usuario no existe', async () => {
        let userInput = 'kxm1'
        const userExist: any = await User.findOne({ where: { userName: userInput } });
        expect(userExist).to.be.null;
    });

})