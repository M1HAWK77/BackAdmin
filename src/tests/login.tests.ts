// Importa la biblioteca Chai y los estilos de aserción que deseas utilizar
import { expect } from 'chai';
import chaiHttp from 'chai-http';
// Importa la función que deseas probar
import { loginUser } from '../controllers/user.controller';
//sinon.stub se usa para reemplazar las funciones User.findOne, bcrypt.compare y jwt.sign con versiones simuladas que devuelven valores predefinidos.
import sinon from 'sinon';
//para hacer las pruebas del login 
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user.models';
import httpMocks from 'node-mocks-http';
import { Request, Response } from 'express';

//Indicamos que usamos http
chai.use(chaiHttp)


//Describo el grupo de pruebas
describe('Api-login', () => {
    it('Debe devolver true cuando se hayan identificado las credenciales'), async () => {

        //Datos en formato json
        const req: Request = httpMocks.createRequest({
            method: 'POST',
            url: '/userLogin',
            body: {
                userName: 'ariel',
                passwordUser: '123'
            }
        });

        //Simulo Respuesta del servidor
        const res: Response = httpMocks.createResponse();


        sinon.stub(User, 'findOne').resolves({ passwordUser: 'hashedPassword' } as any);
        sinon.stub(bcrypt, 'compare').resolves(true);
        (sinon.stub(jwt, 'sign') as any).returns('token');

        await loginUser(req, res);
        // Después de llamar a la función, puedes hacer aserciones sobre el objeto res
        // Por ejemplo, puedes verificar el código de estado HTTP y el cuerpo de la respuesta
        expect(res.statusCode).to.equal(200);
        expect(res.json.call('token')).to.equal('token').to.be.true;
        // expect(res.json.calledWith('token')).to.be.true;
    }

    // Define otra prueba  
    /*it('should return false when login is unsuccessful', () => {
        const result = login('wrong_username', 'wrong_password');
        expect(result).to.be.false;
    });*/

})